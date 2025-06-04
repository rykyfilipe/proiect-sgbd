CREATE OR REPLACE TRIGGER trg_set_expected_date
BEFORE UPDATE ON ORDERS
FOR EACH ROW
BEGIN
    IF :NEW.status = 'pending' AND :OLD.status != 'pending' THEN
        :NEW.expected_date := SYSDATE + (:NEW.distance * 5) / (24 * 60);
    END IF;
    
END;
/
