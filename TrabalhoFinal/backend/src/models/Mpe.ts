import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mpes')
class Mpe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  profile_url: string;

  @Column()
  razao_social: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  whatsapp: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Mpe;
