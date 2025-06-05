CREATE OR REPLACE FUNCTION insert_user(p_name varchar2, p_password varchar2, p_phone_number varchar2, p_role varchar2)
RETURN varchar2 AS
BEGIN
    INSERT INTO USERS (name, password, phone_number, role) VALUES ( p_name, p_password, p_phone_number, p_role);
    RETURN 'User added';
END;
/
CREATE OR REPLACE FUNCTION insert_order(id_client NUMBER, id_from NUMBER, id_to NUMBER)
RETURN varchar2 AS
BEGIN
    INSERT INTO ORDERS (id_client,ID_FROM,ID_TO) VALUES ( id_client, id_from, id_to);
    RETURN 'Order created!';
END;
/
BEGIN
    DBMS_OUTPUT.PUT_LINE(INSERT_ORDER(1,2,3));
END;