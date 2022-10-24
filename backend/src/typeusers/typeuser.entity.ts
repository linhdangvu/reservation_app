import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("typeuser")
export class TypeUser{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name:string;
}
