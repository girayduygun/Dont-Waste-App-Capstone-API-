-- Active: 1699460561713@@127.0.0.1@3306@food_db
create table User (
    id int primary key auto_increment,
    user_name varchar(50) not null,
    email varchar(500) not null,
    password int
);

create table FoodPost (
    id int primary key auto_increment,
    name varchar(50) not null,
    description varchar(500) not null,
    rate TINYINT null,
    location varchar(100) null,
    createDate timestamp not null default current_timestamp,
    user_id int,
    foreign key (user_id)
    references user (id)
    on update restrict
    on delete cascade
);