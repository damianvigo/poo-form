const $formulario = document.querySelector('#formulario'),
  $cardEstudiantes = document.querySelector('#cardsEstudiantes'),
  $cardsProfesores = document.querySelector('#cardsProfesores'),
  $templateEstudiante = document.querySelector('#templateEstudiante').content,
  $templateProfesor = document.querySelector('#templateProfesor').content;

const estudiantes = [],
  profesores = [];

$formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const datos = new FormData($formulario);
  const [nombre, edad, opcion] = [...datos.values()];

  if (opcion === 'Estudiante') {
    const estudiante = new Estudiante(nombre, edad);
    console.log(estudiante);
    estudiantes.push(estudiante);
    console.log(estudiantes);
    // static with array of students
    Persona.pintarPersonaUI(estudiantes, opcion);
  }

  if (opcion === 'Profesor') {
    const profesor = new Profesor(nombre, edad);
    console.log(profesor);
    profesores.push(profesor);
    Persona.pintarPersonaUI(profesores, opcion);
  }
});

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  static pintarPersonaUI(personas, tipo) {
    if (tipo === 'Estudiante') {
      $cardEstudiantes.textContent = '';
      const fragment = document.createDocumentFragment();

      personas.forEach((item) => {
        fragment.appendChild(item.agregarNuevoEstudiante());
      });

      $cardEstudiantes.appendChild(fragment);
    }

    if (tipo === 'Profesor') {
      $cardsProfesores.textContent = '';
      const fragment = document.createDocumentFragment();

      personas.forEach((item) => {
        fragment.appendChild(item.agregarNuevoProfesor());
      });

      $cardsProfesores.appendChild(fragment);
    }
  }
}
class Estudiante extends Persona {
  #estado = false;
  #estudiante = 'Estudiante';

  set setEstado(estado) {
    this.#estado = estado;
  }

  get getEstudiante() {
    return this.#estudiante;
  }

  agregarNuevoEstudiante() {
    const clone = $templateEstudiante.cloneNode(true);
    clone.querySelector('h5 .text-primary').textContent = this.nombre;

    return clone;
  }
}

class Profesor extends Persona {
  #profesor = 'Profesor';

  agregarNuevoProfesor() {
    const clone = $templateProfesor.cloneNode(true);
    clone.querySelector('h5').textContent = this.nombre;
    clone.querySelector('h6').textContent = this.#profesor;
    clone.querySelector('.lead').textContent = this.edad;
    return clone;
  }
}
