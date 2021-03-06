import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Usuario from './Usuario';

@Entity('agendamentos')
class Agenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  // eslint-disable-next-line camelcase
  profissional_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'profissional_id' })
  prossifional: Usuario;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}

export default Agenda;
