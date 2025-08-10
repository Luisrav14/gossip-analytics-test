# Gossip Analytics Backend - Prueba Técnica

## Requerimientos

- Node.js v22+ (recomendado para usar el modo `--watch` nativo)
- MongoDB (puedes usar MongoDB Atlas gratuito)
- Cuenta de Stripe (modo test)

## Instalación

1. Clonar el repositorio

   ```bash
   git clone https://github.com/Luisrav14/gossip-analytics-test.git
   cd gossip-analytics-test
   ```

2. Instalar dependencias

   ```bash
   npm install
   ```

3. Crear archivo `.env` en la raíz con las siguientes variables o copiar el archivo `.env.template` y renombrarlo a `.env`:

```
PORT=3000
MONGO_URI=<tu_uri_de_mongodb>
STRIPE_SECRET=<tu_clave_secreta_stripe_test>
```

---

## Ejecución

Para iniciar el servidor en modo desarrollo con recarga automática (requiere Node.js 22+):

```bash
npm run dev
```

Para producción (sin recarga automática):

```bash
npm start
```

El servidor estará escuchando en: `http://localhost:3000`

---

## Endpoints

### 1. Registrar Issue

- **POST** `/issues`
- Body JSON:
  ```json
  {
    "type": "failture"
  }
  ```
- Si el issue ya existe, incrementa el contador y actualiza la fecha; si no, crea uno nuevo con count=1.
- Respuesta: documento actualizado.

---

### 2. Obtener Issue por tipo

- **GET** `/issues/:type`
- Respuesta JSON:
  ```json
  {
    "type": "failture",
    "count": 5,
    "lastTimestamp": "2025-08-09T19:00:00.000Z"
  }
  ```

---

### 3. Calcular Ratio de Acción

- **GET** `/ratio`
- Puede recibir el arreglo en el body o en query como string JSON:
  ```json
  [
    { "distancia": 100, "tiempo": 10 },
    { "distancia": 50, "tiempo": 5 }
  ]
  ```
- Respuesta JSON:
  ```json
  {
    "ratio": "10.00"
  }
  ```

---

### 4. Checkout Stripe (simulado)

- **GET** `/checkout`
- Crea una sesión de pago en modo test y devuelve:
  ```json
  {
    "checkout_url": "https://checkout.stripe.com/c/pay/cs_test_xxxxxxx"
  }
  ```
- El frontend debe abrir esta URL para proceder al pago.
