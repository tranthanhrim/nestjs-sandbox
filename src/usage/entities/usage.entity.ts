import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('usages')
export class Usage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
