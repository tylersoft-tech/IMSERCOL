#!/usr/bin/env python3
"""
Descarga las imagenes actuales de imsercol.com listadas en ../inventario/imagenes_actuales_urls.csv
Requiere: pip install requests pillow
Uso:
  python descargar_imagenes_actuales.py
"""
from pathlib import Path
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse
import csv, re, requests

BASE = Path(__file__).resolve().parent.parent
CSV = BASE / 'inventario' / 'imagenes_actuales_urls.csv'
OUT = BASE / 'imagenes_descargadas_actuales'
OUT.mkdir(exist_ok=True)

def force_non_avif(url: str) -> str:
    # Zyro/Cloudflare: cambiar format=auto por jpeg para evitar AVIF cuando sea posible.
    url = url.replace('format%3Dauto', 'format%3Djpeg').replace('format=auto', 'format=jpeg')
    # Unsplash: pedir jpg explicitamente.
    if 'images.unsplash.com' in url:
        parsed = urlparse(url)
        q = dict(parse_qsl(parsed.query, keep_blank_values=True))
        q.pop('auto', None)
        q['fm'] = 'jpg'
        parsed = parsed._replace(query=urlencode(q))
        url = urlunparse(parsed)
    return url

def safe_name(text):
    text = re.sub(r'[^a-zA-Z0-9_-]+','_',text).strip('_')
    return text[:90] or 'imagen'

with CSV.open(encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

for i,row in enumerate(rows,1):
    url = force_non_avif(row['url_original_vista'])
    name = f"{i:03d}_{safe_name(row['pagina'])}_{safe_name(row['seccion'])}_{safe_name(row['descripcion'])}.jpg"
    path = OUT / name
    try:
        r = requests.get(url, timeout=30, headers={'User-Agent':'Mozilla/5.0','Accept':'image/jpeg,image/png,image/webp,*/*;q=0.8'})
        r.raise_for_status()
        ctype = r.headers.get('content-type','').lower()
        ext = '.jpg'
        if 'png' in ctype: ext = '.png'
        elif 'webp' in ctype: ext = '.webp'
        elif 'avif' in ctype: ext = '.avif'
        path = path.with_suffix(ext)
        path.write_bytes(r.content)
        print('OK ', path.name, ctype)
    except Exception as e:
        print('FAIL', i, row['descripcion'], e)

print('\nListo. Revisa:', OUT)
