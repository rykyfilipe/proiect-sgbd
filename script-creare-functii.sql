create or replace FUNCTION get_min_distance(v_from IN NUMBER, v_to IN NUMBER)
RETURN NUMBER
IS
    TYPE t_distante IS TABLE OF NUMBER INDEX BY PLS_INTEGER;
    TYPE t_vizitat IS TABLE OF BOOLEAN INDEX BY PLS_INTEGER;

    distante t_distante;
    vizitat t_vizitat;

    nod_curent NUMBER;
    min_dist NUMBER;
    nod NUMBER;

    CURSOR c_noduri IS
        SELECT DISTINCT id_from AS nod FROM distance
        UNION
        SELECT DISTINCT id_to FROM distance;
BEGIN
    -- Inițializare
    FOR r IN c_noduri LOOP
        distante(r.nod) := 999999;
        vizitat(r.nod) := FALSE;
    END LOOP;

    distante(v_from) := 0;

    LOOP
        -- Găsim nodul nevizitat cu distanța minimă
        min_dist := 999999;
        nod_curent := NULL;

        FOR i IN distante.FIRST .. distante.LAST LOOP
            nod := i;
            IF NOT vizitat(nod) AND distante.EXISTS(nod) AND distante(nod) < min_dist THEN
                min_dist := distante(nod);
                nod_curent := nod;
            END IF;
        END LOOP;

        EXIT WHEN nod_curent IS NULL OR nod_curent = v_to;

        vizitat(nod_curent) := TRUE;

        -- Relaxăm vecinii
        FOR rec IN (
            SELECT id_to, distance
            FROM distance
            WHERE id_from = nod_curent
        ) LOOP
            IF NOT distante.EXISTS(rec.id_to) THEN
                distante(rec.id_to) := 999999;
            END IF;

            IF distante(rec.id_to) > distante(nod_curent) + rec.distance THEN
                distante(rec.id_to) := distante(nod_curent) + rec.distance;
            END IF;
        END LOOP;
    END LOOP;

    -- Returnăm distanța către v_to
    IF distante.EXISTS(v_to) AND distante(v_to) < 999999 THEN
        RETURN distante(v_to);
    ELSE
        RETURN NULL; -- Nu există drum
    END IF;
END;

create or replace FUNCTION insert_order(id_client NUMBER, id_from NUMBER, id_to NUMBER)
RETURN varchar2 AS
BEGIN
    INSERT INTO ORDERS (id_client,ID_FROM,ID_TO) VALUES ( id_client, id_from, id_to);
    RETURN 'Order created!';
END;

create or replace FUNCTION insert_user(p_name varchar2, p_password varchar2, p_phone_number varchar2, p_role varchar2)
RETURN varchar2 AS
BEGIN
    INSERT INTO USERS (name, password, phone_number, role) VALUES ( p_name, p_password, p_phone_number, p_role);
    RETURN 'User added';
END;
