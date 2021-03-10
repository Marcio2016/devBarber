import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agendamentos')
class Agenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  profissional: string;

  @Column('timestamp with time zone')
  data: Date;
}

export default Agenda;
