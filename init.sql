use taskdb;

CREATE TABLE label (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    label_id BIGINT,
    FOREIGN KEY (label_id) REFERENCES label(id) ON DELETE SET NULL
);
INSERT INTO label (name) VALUES ('Home');
INSERT INTO label (name) VALUES ('Work');


INSERT INTO task (title, completed, label_id) VALUES ('Clean the house', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Pay utility bills', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Mow the lawn', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Prepare dinner', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Wash the car', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Organize the closet', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Water the plants', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Walk the dog', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Grocery shopping', false, 1);
INSERT INTO task (title, completed, label_id) VALUES ('Do the laundry', false, 1);

INSERT INTO task (title, completed, label_id) VALUES ('Finish presentation', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Send invoices', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Schedule client meeting', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Review project plan', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Update the website', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Respond to emails', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Conduct market research', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Plan team building event', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Analyze department budget', false, 2);
INSERT INTO task (title, completed, label_id) VALUES ('Prepare quarterly report', false, 2);
