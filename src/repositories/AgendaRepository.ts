import { EntityRepository, Repository } from 'typeorm';
import Agenda from '../models/Agenda';

@EntityRepository(Agenda)
class AgendaRepository extends Repository<Agenda> {
  public async findByDate(data: Date): Promise<Agenda | null> {
    const agendamentoComDatasIguais = await this.findOne({
      where: { data },
    });

    return agendamentoComDatasIguais || null;
  }
}

export default AgendaRepository;
