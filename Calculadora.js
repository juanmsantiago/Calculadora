class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        return num2 === 0 ? 'Error' : num1 / num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }


    //Raíz cuadrada
    raizCuadrada(num) {
        if (num < 0) return 'Error'; // No se calculan raíces negativas
        let x = num;
        let precision = 0.001;
        while (Math.abs(x * x - num) > precision) {
            x = 0.5 * (x + num / x);
        }
        return parseFloat(x.toFixed(3)); // Redondear a 3 decimales
    }

    //Función exponencial
    exponencial(num) {
        let suma = 1; // Primer término de la serie
        let termino = 1; 
        let precision = 0.001; // Precisión de cálculo
        for (let i = 1; termino > precision; i++) {
            termino *= num / i; // Generar el siguiente término
            suma += termino; 
        }
        return parseFloat(suma.toFixed(3)); // Redondear a 3 decimales
    }
}
