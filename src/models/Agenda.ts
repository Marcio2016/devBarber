import { uuid } from 'uuidv4';

class Agenda {
  id: string;

  profissional: string;

  data: Date;

  constructor({ profissional, data }: Omit<Agenda, 'id'>) {
    this.id = uuid();
    this.profissional = profissional;
    this.data = data;
  }
}

export default Agenda;
