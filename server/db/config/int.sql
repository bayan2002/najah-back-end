-- Create user if not exists
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'userbayan'
   ) THEN
      CREATE ROLE userbayan WITH LOGIN SUPERUSER PASSWORD '123456';
   END IF;
END
$$;

-- Create database if not exists
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'najah'
   ) THEN
      CREATE DATABASE najah;
   END IF;
END
$$;

-- Change owner of database
ALTER DATABASE najah OWNER TO userbayan;