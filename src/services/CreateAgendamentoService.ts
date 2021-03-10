import { startOfHour } from 'date-fns';
import Agenda from '../models/Agenda';
import AgendaRepository from '../repositories/AgendaRepository';

interface Request {
  profissional: string;
  data: Date;
}

class CreateAgendamentoService {
  private repository: AgendaRepository;

  constructor(repository: AgendaRepository) {
    this.repository = repository;
  }

  public execute({ profissional, data }: Request): Agenda {
    const dataRecebida = startOfHour(data);
    const agendamentoComDatasIguais = this.repository.findByDate(dataRecebida);

    if (agendamentoComDatasIguais) {
      throw Error('Este horário já está preenchida');
    }
    const agendamento = this.repository.create({
      profissional,
      data: dataRecebida,
    });

    return agendamento;
  }
}

export default CreateAgendamentoService;
