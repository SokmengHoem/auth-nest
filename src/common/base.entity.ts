import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity } from 'typeorm';

@Entity()
export abstract class BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })  // Automatically set on insert
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })  // Automatically set on update
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'int', nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
  
}
