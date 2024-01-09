const transporter = require ("../../../nodemailer")

const postNodemailerUserRegisterController = async (name, email) =>{
    await transporter.sendMail({

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: email,
        html: `<style>
        .boton-compra {
            background-color: #E62F05;
            color: #F2F2F2;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .boton-whatsapp {
            background-color: #25D366;
            color: #FFF;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
           
        }
        .boton-insta {
            background: linear-gradient(to right, #833AB4, #F56040);
            color: #FFF;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        /* Estilos adicionales para mejorar la apariencia */
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin: 50px;
        }
    </style>

<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif;">
        <h2>Bienvenido a Drewili</h2>
        <p>Hola ${name},</p>
        <p>¡Gracias por crear tu perfil en Drewili! </p>
        <p>Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
        <p>A partir de ahora, puedes comprar productos, realizar dropshipping, dejar tus reseñas y muchas cosas más.</p>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.
        </p>
        <p>¡Esperamos que disfrutes de tu experiencia en Drewili!</p>
        <p>Saludos,</p>
        <p>El equipo de Drewili</p>
        <button class="boton-compra" onclick="window.location.href='https://drewilifront.vercel.app/'">Compra
            ahora</button>
      <hr></hr>
        <div>
            <button class="boton-insta"
                onclick="window.location.href='https://www.instagram.com/dropshipping.peru/'">Instagram</button>
            <button class="boton-whatsapp" onclick="window.location.href='https://wa.me/51971985484'">Whatsapp</button>
        </div>
    </div>
</body>`,

    })
}

module.exports = postNodemailerUserRegisterController