insert into users 
(id, given_name, family_name, display_name, mail_address, user_role, user_status)
values 
(0, 'Yuma', 'Higashitani', 'Gattani', 'higayu624@gmail.com', 0, 1);

insert into products 
(id, user_id, product_link, title, sub_title, exposition, appeal_point)
values 
(0, 0, 'nobiru.com', 'nobiru', 'display your portfolio!', 'this is portfolio SNS! diaplay your technical stacks!!', 'プロダクト立ち上げの全ての工程を頑張った！');

insert into technical_stacks 
(id, product_id, technical_name, technical_type)
values
(0, 0, 'Golang', 'lang');