
const preguntas = {

    //ADENTRO Y AFUERA

    espacial_adentro_afuera: [
        {
            pregunta: '¿Dónde está la pelota?',
            imagen: '📦  🏀',
            opciones: ['Adentro', 'Afuera'],
            respuesta: 'Afuera'
        },
        {
            pregunta: '¿Dónde está el gato?',
            imagen: '📦\n🐱',
            opciones: ['Adentro', 'Afuera'],
            respuesta: 'Adentro'
        },
        {
            pregunta: '¿Dónde está el balón?',
            imagen: '🧺  ⚽',
            opciones: ['Adentro', 'Afuera'],
            respuesta: 'Afuera'
        }
    ],


    //ARRIBA Y ABAJO

    espacial_arriba_abajo: [
        {
            pregunta: '¿Dónde está el sol?',
            imagen: '☀️\n\n🌳',
            opciones: ['Arriba', 'Abajo'],
            respuesta: 'Arriba'
        },
        {
            pregunta: '¿Dónde están las raíces?',
            imagen: '🌳\n🟫',
            opciones: ['Arriba', 'Abajo'],
            respuesta: 'Abajo'
        },
        {
            pregunta: '¿Dónde está el pájaro?',
            imagen: '🐦\n\n🌳',
            opciones: ['Arriba', 'Abajo'],
            respuesta: 'Arriba'
        }
    ],


    //CERCA Y LEJOS

    espacial_cerca_lejos: [
        {
            pregunta: '¿Qué objeto está más cerca del niño?',
            imagen: '🧒  🏀\n\n🏠',
            opciones: ['La pelota', 'La casa'],
            respuesta: 'La pelota'
        },
        {
            pregunta: '¿Qué objeto está más lejos del niño?',
            imagen: '🧒  🧸\n\n\n🚗',
            opciones: ['El oso', 'El carro'],
            respuesta: 'El carro'
        },
        {
            pregunta: '¿Qué está más cerca del niño?',
            imagen: '🧒  🍎\n\n🌳',
            opciones: ['La manzana', 'El árbol'],
            respuesta: 'La manzana'
        }
    ],


    //ENCIMA Y DEBAJO

    espacial_encima_debajo: [
        {
            pregunta: '¿Dónde está el libro respecto a la silla?',
            imagen: '📚\n🪑',
            opciones: ['Encima', 'Debajo'],
            respuesta: 'Encima'
        },
        {
            pregunta: '¿Dónde está el gato respecto a la silla?',
            imagen: '🪑\n🐱',
            opciones: ['Encima', 'Debajo'],
            respuesta: 'Debajo'
        },
        {
            pregunta: '¿Dónde está la taza respecto a la silla?',
            imagen: '☕\n🪑',
            opciones: ['Encima', 'Debajo'],
            respuesta: 'Encima'
        }
    ],


    //FIGURAS GEOMÉTRICAS

    figuras_geometricas: [
        {
            pregunta: '¿Qué figura tiene tres lados?',
            imagen: '🔺',
            opciones: ['Cuadrado', 'Triángulo', 'Círculo'],
            respuesta: 'Triángulo'
        },
        {
            pregunta: '¿Qué figura es redonda?',
            imagen: '🔵',
            opciones: ['Círculo', 'Triángulo', 'Rectángulo'],
            respuesta: 'Círculo'
        },
        {
            pregunta: '¿Qué figura tiene cuatro lados iguales?',
            imagen: '🟩',
            opciones: ['Círculo', 'Cuadrado', 'Rectángulo'],
            respuesta: 'Cuadrado'
        },
        {
            pregunta: '¿Qué figura tiene cuatro lados y dos lados largos y dos cortos?',
            imagen: '',
            opciones: ['Triángulo', 'Círculo', 'Rectángulo'],
            respuesta: 'Rectángulo'
        }
    ],


    //JUEGO DE MEMORIA

    juego_memoria: [
        {
            pregunta: '¿Qué animal hace miau?',
            imagen: '🐱',
            opciones: ['Perro', 'Gato', 'Vaca'],
            respuesta: 'Gato'
        },
        {
            pregunta: '¿Qué animal hace guau?',
            imagen: '🐶',
            opciones: ['Gato', 'Pato', 'Perro'],
            respuesta: 'Perro'
        },
        {
            pregunta: '¿Qué animal tiene una trompa larga?',
            imagen: '🐘',
            opciones: ['Elefante', 'León', 'Caballo'],
            respuesta: 'Elefante'
        }
    ],


    //TABLAS DE MULTIPLICAR

    tablas_multiplicar: [
        {
            pregunta: '¿Cuánto es 2 × 3?',
            opciones: ['5', '6', '8'],
            respuesta: '6'
        },
        {
            pregunta: '¿Cuánto es 4 × 5?',
            opciones: ['15', '20', '25'],
            respuesta: '20'
        },
        {
            pregunta: '¿Cuánto es 7 × 3?',
            opciones: ['18', '21', '24'],
            respuesta: '21'
        }
    ],


    //SUMA DE QUEBRADOS

    suma_quebrados: [
        {
            pregunta: '¿Cuánto es 1/2 + 1/2?',
            opciones: ['1/2', '1', '2'],
            respuesta: '1'
        },
        {
            pregunta: '¿Cuánto es 1/4 + 1/4?',
            opciones: ['1/2', '1/4', '1'],
            respuesta: '1/2'
        },
        {
            pregunta: '¿Cuánto es 1/3 + 1/3?',
            opciones: ['1/3', '2/3', '1'],
            respuesta: '2/3'
        }
    ],


    //MULTIPLICACIÓN CON DECIMALES

    multiplicacion_decimales: [
        {
            pregunta: '¿Cuánto es 2.5 × 2?',
            opciones: ['4', '5', '6'],
            respuesta: '5'
        },
        {
            pregunta: '¿Cuánto es 1.5 × 3?',
            opciones: ['3.5', '4.5', '5.5'],
            respuesta: '4.5'
        },
        {
            pregunta: '¿Cuánto es 2.4 × 2?',
            opciones: ['4.2', '4.8', '5.2'],
            respuesta: '4.8'
        }
    ]
};

export default preguntas;
