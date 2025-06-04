BEGIN
    -- Populare USERS
    INSERT INTO USERS (id, name, password, phone_number, role) VALUES (1, 'alex', 'pass123', '0711111111', 'client');
    INSERT INTO USERS (id, name, password, phone_number, role) VALUES (2, 'bianca', 'pass456', '0722222222', 'client');
    INSERT INTO USERS (id, name, password, phone_number, role) VALUES (3, 'cristian', 'pass789', '0733333333', 'curier');

    -- Populare LOCATION (20 locații)
    INSERT INTO LOCATION (id, name) VALUES (1, 'Bucuresti');
    INSERT INTO LOCATION (id, name) VALUES (2, 'Cluj-Napoca');
    INSERT INTO LOCATION (id, name) VALUES (3, 'Timisoara');
    INSERT INTO LOCATION (id, name) VALUES (4, 'Iasi');
    INSERT INTO LOCATION (id, name) VALUES (5, 'Brasov');
    INSERT INTO LOCATION (id, name) VALUES (6, 'Constanta');
    INSERT INTO LOCATION (id, name) VALUES (7, 'Sibiu');
    INSERT INTO LOCATION (id, name) VALUES (8, 'Oradea');
    INSERT INTO LOCATION (id, name) VALUES (9, 'Craiova');
    INSERT INTO LOCATION (id, name) VALUES (10, 'Galati');
    INSERT INTO LOCATION (id, name) VALUES (11, 'Baia Mare');
    INSERT INTO LOCATION (id, name) VALUES (12, 'Bacau');
    INSERT INTO LOCATION (id, name) VALUES (13, 'Arad');
    INSERT INTO LOCATION (id, name) VALUES (14, 'Ploiesti');
    INSERT INTO LOCATION (id, name) VALUES (15, 'Targu Mures');
    INSERT INTO LOCATION (id, name) VALUES (16, 'Suceava');
    INSERT INTO LOCATION (id, name) VALUES (17, 'Buzau');
    INSERT INTO LOCATION (id, name) VALUES (18, 'Pitesti');
    INSERT INTO LOCATION (id, name) VALUES (19, 'Alba Iulia');
    INSERT INTO LOCATION (id, name) VALUES (20, 'Resita');

      INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (1, 2, 7, 400);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (2, 7, 2, 400);

    -- Cluj - Iasi
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (3, 2, 4, 100);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (4, 4, 2, 100);

    -- Cluj - Constanta
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (5, 2, 6, 500);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (6, 6, 2, 500);

    -- Timisoara - Targu Mures
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (7, 3, 15, 150);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (8, 15, 3, 150);

    -- Timisoara - Galati
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (9, 3, 10, 200);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (10, 10, 3, 200);

    -- Timisoara - Iasi
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (11, 3, 4, 370);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (12, 4, 3, 370);

    -- Sibiu - Brasov
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (13, 7, 5, 150);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (14, 5, 7, 150);

    -- Iasi - Ploiesti
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (15, 4, 14, 700);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (16, 14, 4, 700);

    -- Oradea - Bacau
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (17, 8, 12, 210);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (18, 12, 8, 210);

    -- Bacau - Baia Mare
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (19, 12, 11, 340);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (20, 11, 12, 340);

    -- Craiova - Cluj
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (21, 9, 2, 800);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (22, 2, 9, 800);

    -- Arad - Oradea
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (23, 13, 8, 90);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (24, 8, 13, 90);

    -- Suceava - Arad
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (25, 16, 13, 900);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (26, 13, 16, 900);

    -- Ploiesti - Baia Mare
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (27, 14, 11, 40);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (28, 11, 14, 40);

    -- Galati - Ploiesti
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (29, 10, 14, 470);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (30, 14, 10, 470);

    -- Suceava - Brasov
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (31, 16, 5, 450);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (32, 5, 16, 450);

    -- Baia Mare - Constanta
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (33, 11, 6, 490);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (34, 6, 11, 490);

    -- Buzau - Craiova
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (35, 17, 9, 360);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (36, 9, 17, 360);

    -- Pitesti - Resita
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (37, 18, 20, 890);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (38, 20, 18, 890);

    -- Alba Iulia - Pitesti
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (39, 19, 18, 310);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (40, 18, 19, 310);

    -- Iasi - Alba Iulia
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (41, 4, 19, 10);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (42, 19, 4, 10);

    -- Resita - Oradea
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (43, 20, 8, 680);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (44, 8, 20, 680);

    -- Constanta - Craiova
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (45, 6, 9, 730);
    INSERT INTO DISTANCE (id, id_from, id_to, distance) VALUES (46, 9, 6, 730);

    -- Populare ORDERS
    INSERT INTO ORDERS (id, id_client, id_from, id_to, status, created_at) VALUES (1, 1, 1, 2, 'pending', SYSDATE);
    INSERT INTO ORDERS (id, id_client, id_from, id_to, status, created_at) VALUES (2, 1, 2, 5, 'shipped', SYSDATE - 1);
    INSERT INTO ORDERS (id, id_client, id_from, id_to, status, created_at) VALUES (3, 2, 3, 6, 'completed', SYSDATE - 3);
    INSERT INTO ORDERS (id, id_client, id_from, id_to, status, created_at) VALUES (4, 2, 4, 7, 'pending', SYSDATE - 2);

    COMMIT;
END;
/
