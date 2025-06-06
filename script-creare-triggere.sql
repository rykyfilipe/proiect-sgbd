CREATE OR REPLACE TRIGGER trg_set_expected_date
BEFORE UPDATE ON ORDERS
FOR EACH ROW
BEGIN
    IF UPDATING('status') THEN
        IF :NEW.status = 'pending' AND :OLD.status != 'pending' THEN
            IF :NEW.distance IS NULL THEN
                raise_application_error(-20000, 'Distance is not found for this order.');
            END IF;

            :NEW.expected_date := SYSDATE + (:NEW.distance * 5) / (24 * 60);
        END IF;
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
        :NEW.status := 'created';
        :NEW.created_at := SYSDATE;
        END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_users_autoinc
BEFORE INSERT ON USERS
FOR EACH ROW
DECLARE
    next_id NUMBER;
BEGIN
    DECLARE
        v_id NUMBER;
    BEGIN
        SELECT 1 INTO v_id FROM USERS WHERE name = :NEW.name;
        raise_application_error(-20000, 'User with same name already exists.');
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            NULL; 
    END;

    IF :NEW.id IS NULL THEN
        SELECT NVL(MAX(id), 0) + 1 INTO next_id FROM USERS;
        :NEW.id := next_id;
    END IF;
END;
/
create or replace TRIGGER add_min_distance 
    BEFORE INSERT ON orders
    FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM location
    WHERE id = :NEW.id_from;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Start location does not exist');
    END IF;

    -- Verificare id_to în tabela location
    SELECT COUNT(*) INTO v_count
    FROM location
    WHERE id = :NEW.id_to;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'ENd location does not exist');
    END IF;
    -- Setăm automat coloana distance
    :NEW.distance := get_min_distance(:NEW.id_from, :NEW.id_to);
END;
