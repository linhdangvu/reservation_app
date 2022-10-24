import { TypeUser } from 'src/typeusers/typeuser.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity("user")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    firstname:string;

    @Column({ length: 250 })
    lastname:string;
    
    @Column({ length: 12 })
    phone:string;

    @Column({ length: 250, unique:true })
    email:string;

    @Column('text')
    password:string;

    @ManyToOne(type => TypeUser, role => role.id)
    @JoinColumn({name:'type'})
    type:TypeUser;

    @Column({nullable:true})
    refreshtoken:string;
 
    @Column({nullable:true})
    refreshtokenexpires:string;

}
