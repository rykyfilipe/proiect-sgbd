CREATE TABLE USERS (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(50) UNIQUE NOT NULL,
    password VARCHAR2(50) NOT NULL,
    phone_number VARCHAR2(50) UNIQUE,
    role VARCHAR2(50) NOT NULL
);

CREATE TABLE LOCATION (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(50) NOT NULL
);

CREATE TABLE ORDERS (
    id NUMBER PRIMARY KEY,
    id_client NUMBER NOT NULL,
    id_from NUMBER NOT NULL,
    id_to NUMBER NOT NULL,
    id_curier NUMBER DEFAULT NULL,
    distance NUMBER DEFAULT NULL,
    status VARCHAR2(50) NOT NULL,
    created_at DATE,

    CONSTRAINT fk_id_client FOREIGN KEY (id_client) REFERENCES USERS(id),
    CONSTRAINT fk_id_curier FOREIGN KEY (id_curier) REFERENCES USERS(id),
    CONSTRAINT fk_id_from FOREIGN KEY (id_from) REFERENCES LOCATION(id),
    CONSTRAINT fk_id_to FOREIGN KEY (id_to) REFERENCES LOCATION(id)
);

CREATE TABLE DISTANCE (
    id NUMBER PRIMARY KEY,
    id_from NUMBER NOT NULL,
    id_to NUMBER NOT NULL,
    distance NUMBER NOT NULL,

    CONSTRAINT fk_distance_from FOREIGN KEY (id_from) REFERENCES LOCATION(id),
    CONSTRAINT fk_distance_to FOREIGN KEY (id_to) REFERENCES LOCATION(id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
);
