# IMSERCOL S.A.S. static website

Sitio web estatico construido en HTML, CSS y JavaScript puro para IMSERCOL S.A.S.

## Estructura

- `index.html`: inicio.
- `servicios.html`: servicios acreditados y complementarios.
- `acreditacion-onac.html`: acreditacion ONAC, vigencia y documentos.
- `alcance-acreditado.html`: tabla de alcance ONAC 23-OIN-020.
- `proyectos.html`: galeria filtrable con imagenes de referencia tecnica.
- `contacto.html`: formulario de cotizacion tecnica.
- `en/index.html`: version inglesa resumida.
- `legal/privacidad.html` y `legal/tratamiento-datos.html`: textos legales base.
- `css/styles.css`: estilos globales.
- `js/data.js`: datos editables de servicios, galeria y contacto.
- `js/main.js`: menu movil, filtros, validacion de formulario, back-to-top y header sticky.
- `assets/`: imagenes, logos ONAC y certificado.

## Como abrir

Abrir `index.html` directamente en el navegador. No requiere build, Node, dependencias ni servidor.

## Edicion rapida

- Cambiar correos, telefonos o WhatsApp en `js/data.js` y en los bloques visibles de `contacto.html` cuando el cliente confirme datos oficiales.
- Reemplazar imagenes en `assets/img/` manteniendo rutas o actualizando `js/data.js`.
- Actualizar textos legales con asesoria juridica antes de publicar.
- Validar que el logo ONAC no sea deformado ni usado fuera de las paginas de acreditacion, alcance o bloques informativos permitidos.

## Nota ONAC

Antes de publicacion final, el alcance ONAC debe validarse contra el certificado vigente emitido por ONAC. El sitio evita lenguaje que sugiera certificacion empresarial general, cobertura ONAC para toda la oferta o respaldo ONAC sobre cotizaciones.

Datos usados desde el certificado incluido:

- Codigo: `23-OIN-020`.
- Norma: `ISO/IEC 17020:2012`.
- Tipo: Organismo de Inspeccion.
- Vigencia visible: `2024-07-18` a `2027-07-17`.
- Sede: Calle 74 No. 30-32 La Floresta, Barrancabermeja, Santander, Colombia.

## Despliegue

Subir todos los archivos y carpetas al hosting estatico. Mantener la misma estructura para que las rutas relativas funcionen.
