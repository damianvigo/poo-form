const $formulario = document.querySelector('#formulario'),
  $cardEstudiantes = document.querySelector('#cardsEstudiantes'),
  $cardsProfesores = document.querySelector('#cardsProfesores'),
  $templateEstudiante = document.querySelector('#templateEstudiante').content,
  $templateProfesor = document.querySelector('#templateProfesor').content;

const estudiantes = [],
  profesores = [];

document.addEventListener('click', (e) => {
  if (e.target.dataset.uid) {
    if (e.target.matches('.btn-success')) {
      estudiantes.map((item) => {
        if (item.uid === e.target.dataset.uid) {
          item.setEstado = true;
        }
        console.log(item);
        return item;
      });
    }
    if (e.target.matches('.btn-danger')) {
      estudiantes.map((item) => {
        if (item.uid === e.target.dataset.uid) {
          item.setEstado = false;
        }
        console.log(item);
        return item;
      });
    }
    Persona.pintarPersonaUI(estudiantes, 'Estudiante');
  }
});

$formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const datos = new FormData($formulario);
  console.log(datos);
  const [nombre, email, opcion] = [...datos.values()];
  console.log(nombre, email, opcion);

  if (opcion === 'Estudiante') {
    const estudiante = new Estudiante(nombre, email);
    console.log(estudiante);
    estudiantes.push(estudiante);
    console.log(estudiantes);
    // static with array of students
    Persona.pintarPersonaUI(estudiantes, opcion);
  }

  if (opcion === 'Profesor') {
    const profesor = new Profesor(nombre, email);
    console.log(profesor);
    profesores.push(profesor);
    Persona.pintarPersonaUI(profesores, opcion);
  }
});

class Persona {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.uid = `${Date.now()}`;
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
    clone.querySelector('h6').textContent = this.getEstudiante;
    clone.querySelector('.lead').textContent = this.email;

    if (this.#estado) {
      clone.querySelector('.badge').className = 'badge bg-success';
      clone.querySelector('.btn-success').disabled = true;
      clone.querySelector('.btn-danger').disabled = false;
    } else {
      clone.querySelector('.badge').className = 'badge bg-danger';
      clone.querySelector('.btn-danger').disabled = true;
      clone.querySelector('.btn-success').disabled = false;
    }

    clone.querySelector('.badge').textContent = this.#estado
      ? 'Aprobado'
      : 'Desaprobado';

    clone.querySelector('.btn-success').dataset.uid = this.uid;
    clone.querySelector('.btn-danger').dataset.uid = this.uid;

    return clone;
  }
}

class Profesor extends Persona {
  #profesor = 'Profesor';

  agregarNuevoProfesor() {
    const clone = $templateProfesor.cloneNode(true);
    clone.querySelector('h5').textContent = this.nombre;
    clone.querySelector('h6').textContent = this.#profesor;
    clone.querySelector('.lead').textContent = this.email;
    return clone;
  }
}
