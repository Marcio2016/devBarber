import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Agenda from '../models/Agenda';
import AgendaRepository from '../repositories/AgendaRepository';

interface Request {
  profissional: string;
  data: Date;
}

class CreateAgendamentoService {
  public async execute({ profissional, data }: Request): Promise<Agenda> {
    const repository = getCustomRepository(AgendaRepository);

    const dataRecebida = startOfHour(data);
    const agendamentoComDatasIguais = await repository.findByDate(dataRecebida);

    if (agendamentoComDatasIguais) {
      throw Error('Este horário já está preenchida');
    }
    const agendamento = repository.create({
      profissional,
      data: dataRecebida,
    });

    await repository.save(agendamento);

    return agendamento;
  }
}

export default CreateAgendamentoService;
