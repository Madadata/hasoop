drop database if exists harry;
create database harry;

use harry;

create table books (
    id int not null AUTO_INCREMENT,
    title varchar(100),
    author varchar(100),
    primary key (id)
);
insert into books (title, author) values ('the Sorcerer\'s Stone', 'J. K. Rowling');
insert into books (title, author) values ('the Chamber of Secrets', 'J. K. Rowling');
insert into books (title, author) values ('the Prisoner of Azkaban', 'J. K. Rowling');
insert into books (title, author) values ('the Goblet of Fire', 'J. K. Rowling');
insert into books (title, author) values ('the Order of the Phoenix', 'J. K. Rowling');
insert into books (title, author) values ('the Half-Blood Prince', 'J. K. Rowling');
insert into books (title, author) values ('the Deathly Hallows', 'J. K. Rowling');
insert into books (title, author) values ('the Cursed Child', 'J. K. Rowling');

create table characters (
    id int not null AUTO_INCREMENT,
    name varchar(100),
    sex int,
    primary key (id)
);
insert into characters (name, sex) values ('Albus Dumbledore', 1);
insert into characters (name, sex) values ('Severus Snape', 1);
insert into characters (name, sex) values ('James Potter', 1);
insert into characters (name, sex) values ('Lily Evans', 2);
insert into characters (name, sex) values ('Gellert Grindelwald', 1);
insert into characters (name, sex) values ('Dobby', 3);
insert into characters (name, sex) values ('Cho Chang', 2);
insert into characters (name, sex) values ('Hermione Jean Granger', 2);
insert into characters (name, sex) values ('Harry James Potter', 1);
insert into characters (name, sex) values ('Ronald Bilius Weasley(Ron)', 1);


show databases;
use harry;
select * from books;
select * from characters;