CREATE OR REPLACE TRIGGER trg_set_expected_date
BEFORE UPDATE ON ORDERS
FOR EACH ROW
BEGIN
    IF :NEW.status = 'pending' AND :OLD.status != 'pending' THEN
        :NEW.expected_date := SYSDATE + (:NEW.distance * 5) / (24 * 60);
    END IF;
    
END;
/

CREATE OR REPLACE TRIGGER trg_orders_autoinc
BEFORE INSERT ON ORDERS
FOR EACH ROW
DECLARE
    next_id NUMBER;
BEGIN
    IF :NEW.id IS NULL THEN
        SELECT MAX(id) INTO next_id FROM ORDERS;
        :NEW.id := next_id + 1;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_users_autoinc
BEFORE INSERT ON USERS
FOR EACH ROW
DECLARE
    next_id NUMBER;
BEGIN
    IF :NEW.id IS NULL THEN
        SELECT MAX(id) INTO next_id FROM USERS;
        :NEW.id := next_id + 1;
    END IF;
END;
/