import cx_Oracle

conn = cx_Oracle.connect("ryky", "rykyfilipe", "192.168.1.86:1521/xe")
cursor = conn.cursor()

