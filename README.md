# 🍽️ Aplicativo de Restaurant - La Choza del Norte de Chompiras

**Sistema POS (Punto de Venta) completo para la gestión integral de un restaurante.**

[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat-square)](https://tu-app-xxxxx.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat-square&logo=github)](https://github.com/fpiero002/Aplicativo-de-restaurant)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 🎯 Características Principales

### 👨‍💼 Roles de Usuario
- **Mozo**: Gestión de pedidos por mesa, búsqueda de menú, control de órdenes
- **Caja**: Procesamiento de pagos, reportes, control de delivery, anulación de items
- **Delivery**: Gestión de pedidos para entrega a domicilio

### 📋 Funcionalidades
- ✅ Gestión de **58 mesas** en salón + 15 entregas delivery
- ✅ Menú dinámico con **60+ platos** (Ceviches, Segundos, Criollos, Pastas, Truchas, Combos)
- ✅ Control de disponibilidad de items
- ✅ Búsqueda de platos en tiempo real
- ✅ Soporte para pedidos "Para llevar"
- ✅ Pre-cuenta e impresión de tickets
- ✅ Timer de tiempos de mesa
- ✅ Movimiento de mesas
- ✅ Persistencia de datos en localStorage
- ✅ Interfaz responsive y moderna
- ✅ Sistema de notificaciones en tiempo real

### 🎨 Diseño
- Tema personalizado por rol de usuario (Mozo: Azul, Caja: Verde, Delivery: Naranja)
- Interfaz moderna con animaciones fluidas
- Componentes intuitivos y fáciles de usar
- Soporte completo en español

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive con variables CSS y animaciones
- **JavaScript Vanilla** - Lógica de la aplicación sin dependencias
- **LocalStorage** - Persistencia de datos del cliente

---

## 📂 Estructura del Proyecto

```
Aplicativo-de-restaurant/
├── Restaurant.html       # Interfaz principal de la aplicación
├── app.js               # Lógica y funcionalidades del POS
├── styles.css           # Estilos y temas
└── README.md            # Este archivo
```

---

## 🚀 Cómo Usar

### Opción 1: En Línea (Recomendado)
1. Visita tu aplicación en Netlify: [tu-app-xxxxx.netlify.app](https://tu-app-xxxxx.netlify.app)

### Opción 2: Local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/fpiero002/Aplicativo-de-restaurant.git
   cd Aplicativo-de-restaurant
   ```
2. Abre `Restaurant.html` en tu navegador (doble clic o arrastra al navegador)

---

## 🔐 Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| **Mozo** | mozo@restaurant.com | 123456 |
| **Caja** | caja@restaurant.com | 123456 |
| **Delivery** | delivery@restaurant.com | 123456 |

---

## 📱 Menú de Ejemplo

### 🥟 Entradas
- Tequeños con queso - S/ 10.00
- Papa rellena de mariscos - S/ 8.00
- Papa a la Huancaína - S/ 14.00

### 🐟 Ceviches
- Ceviche Clásico - S/ 25.00
- Ceviche Mixto - S/ 30.00
- Ceviche de Conchas Negras - S/ 35.00

### 🍛 Segundos
- Jalea de Mariscos - S/ 35.00
- Arroz con Mariscos - S/ 28.00
- Chicharrón de Pescado - S/ 25.00

### 🥘 Criollos
- Cabrito a la Norteña - S/ 35.00
- Arroz con Pato - S/ 38.00
- Lomo Saltado - S/ 32.00

### 🍝 Pastas
- Fettuccini a la Huancaína con Lomo - S/ 38.00
- Tallarines Verdes con Bistec - S/ 30.00
- Spaghetti con Mariscos - S/ 32.00

### 🦈 Truchas
- Trucha Frita - S/ 25.00
- Chicharrón de Trucha - S/ 28.00
- Sudado de Trucha - S/ 26.00

### 🍽️ Duos y Tríos
- Dúo Marino - S/ 40.00
- Dúo Criollo - S/ 42.00
- Trío Marino - S/ 50.00

### 🥤 Bebidas
- Inca Kola 1L - S/ 10.00
- Cerveza Pilsen - S/ 12.00
- Pisco Sour - S/ 18.00
- Chicha Morada - S/ 15.00

---

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en el navegador usando `localStorage`:
- **restApp_state** - Estado actual de las mesas
- **restApp_menu_availability** - Disponibilidad de items
- **restApp_currentUser** - Usuario autenticado

---

## 🔄 Flujo de Trabajo

1. **Login** → Selecciona tu rol (Mozo, Caja, Delivery)
2. **Dashboard** → Visualiza todas las mesas
3. **Seleccionar Mesa** → Elige mesa para agregar pedido
4. **Buscar Platos** → Usa la barra de búsqueda o filtros por categoría
5. **Agregar Items** → Haz clic en platos para agregarlos
6. **Confirmar Pedido** → Guarda el pedido en la mesa
7. **Caja** → Procesa pagos y genera reportes

---

## 🎁 Funciones Especiales

### Cumpleaños 🎉
Acceso a items gratuitos especiales:
- Barco Botañero (4 Piqueos)
- Tequeños (Cortesía)
- Chalaquitas (Cortesía)
- Brindis (Pisco Sour o Chicha)

### Control de Disponibilidad
- Los Mozos pueden marcar items como "Sold Out"
- Los Cajeros pueden gestionar disponibilidad completa

---

## 📊 Estadísticas del Proyecto

- **Líneas de código**: 900+ (JavaScript)
- **Archivos CSS**: 900+ líneas
- **Items de menú**: 60+
- **Capacidad de mesas**: 73 (58 salón + 15 delivery)

---

## 🤝 Contribuir

¿Tienes ideas para mejorar? Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

---

## 📞 Contacto & Soporte

- **GitHub**: [@fpiero002](https://github.com/fpiero002)
- **Netlify**: [Aplicativo-de-restaurant](https://tu-app-xxxxx.netlify.app)

---

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Sistema de reportes avanzados
- [ ] Gestión de inventario
- [ ] Integración de pagos en línea
- [ ] Aplicación móvil nativa
- [ ] Sistema de reservas

---

**Desarrollado con ❤️ para La Choza del Norte de Chompiras**

*Última actualización: 28 de enero de 2026*
