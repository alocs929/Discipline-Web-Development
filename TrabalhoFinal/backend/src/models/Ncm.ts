import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ncms')
class Ncm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ncm: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Ncm;
