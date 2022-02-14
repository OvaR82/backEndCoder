/* -------------------------------------------------------------------------- */
/*                                  1er Desafío:                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Consigna: ------------------------------- */
/*
1) Declarar una clase Usuario.

2) Hacer que Usuario cuente con los siguientes atributos:
    nombre: String
    apellido: String
    libros: Object[]
    mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:
    getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
    addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
    countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
    addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.

4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
*/

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    // Retornar el nombre completo del usuario
    getFullName() {
        return this.nombre + " " + this.apellido;
    }
    // Agregar una nueva mascota al array de mascotas
    addMascota(mascota) {
        this.mascotas.push(mascota);
    }
    // Retornar la cantidad de mascotas que tiene el usuario
    countMascotas() {
        return this.mascotas.length;
    }
    // Agregar un nuevo libro al array de libros
    addBook(nombre, autor) {
        this.libros.push({
            nombre: nombre,
            autor: autor
        });
    }
    // Retornar el nombre de los libros que tiene el usuario
    getBookNames() {
        return this.libros.map(function (libro) {
            return libro.nombre;
        });
    }
}

// Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
const usuario = new Usuario("Ova", "Raim", [], []);
console.log(usuario.getFullName());

usuario.addMascota("Perro");
usuario.addMascota("Gato");
usuario.addMascota("Conejo");
usuario.addMascota("Tortuga");
console.log(usuario.countMascotas());

usuario.addBook("El Señor de los Anillos", "Tolkien");
usuario.addBook("El Hobbit", "Tolkien");
console.log(usuario.getBookNames());

