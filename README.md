# 🛠️ Prueba Técnica - Apolo Web Agency

Este proyecto fue desarrollado como parte de la prueba técnica solicitada por **Apolo Web Agency**. La aplicación permite la creación, edición y gestión de personajes personalizados, implementando almacenamiento local y una interfaz dinámica para su administración.


## 📖 Descripción del Proyecto

Esta aplicación web permite a los usuarios gestionar personajes personalizados con atributos como nombre, especie, género y estado. Además, cuenta con un sistema para editar personajes en un modal interactivo, almacenando todos los datos en el navegador mediante `localStorage`.

---

## 🛠️ Tecnologías Utilizadas

- **React**: Para construir la interfaz de usuario.
- **TypeScript**: Para tipado estático y mejor desarrollo.
- **Context API**: Para manejar el estado global de usuarios y personajes.
- **CSS Modules**: Para un estilo modular y reutilizable.
- **Vercel**: Para desplegar la aplicación.

---

## 🚀 Funcionalidades

1. **Creación de Personajes**:
   - Formulario para crear nuevos personajes con atributos personalizados.
   - Almacenamiento automático en `localStorage`.

2. **Edición de Personajes**:
   - Modal interactivo que permite editar los atributos de personajes existentes.
   - Actualización en tiempo real del estado global y `localStorage`.

3. **Gestión de Estado Global**:
   - Manejo centralizado de personajes mediante `Context API`.
   - Métodos para agregar, editar y eliminar personajes.

4. **Interfaz Intuitiva**:
   - Diseño amigable y accesible para gestionar personajes de forma sencilla.

---


# 📞 Contacto

¡Gracias por visitar este proyecto! Si tienes alguna pregunta, comentario o simplemente deseas ponerte en contacto, aquí tienes cómo hacerlo:

## ✉️ Correo Electrónico
Puedes enviarme un correo electrónico a:  
**[tu.correo@ejemplo.com](mailto:develop.maxsj@gmail.com)**

---

## 💼 LinkedIn
Conéctate conmigo en LinkedIn:  
**[linkedin.com/in/tuperfil](https://www.linkedin.com/in/machifrias/)**

---

## 🌐 Portfolio
Echa un vistazo a mis otros proyectos en mi portfolio:  
**[tuportfolio.com](https://maximiliano-frias.vercel.app/)**

---


## 🚀 Propuestas y Colaboraciones
¿Interesado en colaborar en algún proyecto? ¡Estoy abierto a nuevas ideas y desafíos! Envíame un mensaje y lo conversamos.

---

¡Espero saber de ti pronto! 😊

## 📂 Estructura del Proyecto

```markdown
├── src
│   ├── components
│   │   ├── Card
│   │   │   ├── OwnCharacterCard.tsx   # Componente de tarjeta para personajes personalizados/creados por el usuario
│   │   │   └── Card.tsx               # Coponente de tarjeta de personajes que recibimos de la api
│   │   │   └── Card.css               # Estilos globales de las tarjetas
│   │   ├── Filters
│   │   │   ├── Filters.tsx   # Componente de filtros que renderice en la pestaña de home.
│   │   ├── Footer
│   │   │   ├── Footer.tsx   # Componente de footer reutilizable.
│   │   ├── Form
│   │   │   ├── Form.tsx   # Formulario genérico y reutilizable que me permitio manejar tanto el login como el register
│   │   ├── inputs #Lo que hice fue hacer inputs independientes para que se me hiciera mas comodo manejar las validaciones y mostrarlas bien
│   │   │   ├── Name.tsx
│   │   │   ├── Password.tsx
│   │   │   ├── Email.tsx
│   │   ├── Modal
│   │   │   ├── Modal.tsx   # Modal reutilizable tanto como para editar como para crear personaje  
│   ├── contexts
│   │   └── UserContexts.tsx           # Contexto global para manejar usuarios y personajes
│   ├── pages
│   │   ├── PersonajesCreados.tsx      # Página principal donde se muestran los personajes creados
│   │   └── CharacterDetail.tsx        # Pagina donde se muestran el detalle de los pesonajes utilizando el endpoint de obtener personajes por id.
│   │   └── EditCreate.tsx             # Pagina para editar los personajes
│   │   └── Home.tsx                   # Pagina principal de la pagina
│   │   └── Not-found.tsx              # NotFound page
│   │   └── Login.tsx                  # Pagina de login
│   │   └── Register.tsx               # Pagina de Registro
│   ├── services
│   │   └── getCharacters.ts           # Servicio que hace un get a la api para obtener todos los personajes.
│   │   └── searchCharacters.ts        # Servicio para hacer una busqueda de personajes con una query a la api.
│   │   └── getCharactersById.ts       # Servicio para obtener personajes por id
│   ├── App.tsx                        # Componente principal de la aplicación
│   ├── index.tsx                      # Punto de entrada de React
├── public                             # Archivos estáticos públicos
│   ├── favicon.ico                    # Ícono de la aplicación
├── package.json                       # Dependencias y scripts del proyecto
├── tsconfig.json                      # Configuración de TypeScript
├── README.md                          # Documentación del proyecto


