class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '/',
            multiplicar: 'x',
            restar: '-',
            raizCuadrada: '√',
            exponencial: '^', 
        };
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        if (tipo === 'raizCuadrada') {
            // Si el valor actual no empieza con "√", agregar el símbolo
            if (!this.valorActual.startsWith('√')) {
                this.valorActual = `√${this.valorActual}`;
                this.imprimirValores();
                return;
            }
            // Si ya tiene el símbolo "√", calcular la raíz
            const numero = parseFloat(this.valorActual.slice(1)); // Eliminar "√"
            this.valorActual = this.calculador.raizCuadrada(numero);
            this.valorAnterior = ''; // Limpiar el valor anterior
            this.tipoOperacion = undefined; // Resetear la operación
        } else if (tipo === 'exponencial') {
            this.valorActual = this.calculador.exponencial(parseFloat(this.valorActual));
            this.valorAnterior = ''; 
            this.tipoOperacion = undefined;
        } else {
            this.tipoOperacion !== 'igual' && this.calcular();
            this.tipoOperacion = tipo;
            this.valorAnterior = this.valorActual || this.valorAnterior;
            this.valorActual = '';
        }
        this.imprimirValores();
    }

    agregarNumero(numero) {
        // Evitar agregar números si ya se calculó una raíz
        if (this.valorActual.startsWith('√') && isNaN(numero) && numero !== '.') return;

        if (numero === '.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        // Manejo especial para raíz cuadrada
        if (this.valorActual.startsWith('√')) {
            const numero = parseFloat(this.valorActual.slice(1)); // Extraer número después de "√"
            this.valorActual = this.calculador.raizCuadrada(numero);
            return; // Evitar otros cálculos
        }

        if (isNaN(valorActual) || isNaN(valorAnterior)) return;
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }
}
