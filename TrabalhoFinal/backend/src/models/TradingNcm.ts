import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tradings_ncms')
class TradingNcm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trading_id: string;

  @Column()
  ncm_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TradingNcm;
