import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mpes_ncms')
class MpeNcm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mpe_id: string;

  @Column()
  ncm_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MpeNcm;
