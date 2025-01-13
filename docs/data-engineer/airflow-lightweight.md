# airflow lightweight (docker comppse)

> Read vietnamese step-by-step version [here](https://viblo.asia/p/dung-apache-airflow-phien-ban-cuc-nhe-localexecutor-voi-docker-compose-x7Z4DAjPJnX)

## prerequisites

Make sure you have `docker` and `docker-compose` installed

Follow my guide to install docker and docker-compose: [here](https://thangbuiq.work/docs/linux-and-ubuntu-setup/docker/)

## getting started

1. Clone this repo

```bash
git clone https://github.com/thangbuiq/docker-airflow-lightweight
cd docker-airflow-lightweight
```

2. Optional: Create a `.env` file in the root directory with the fields in `.env.example`

```bash
AIRFLOW_IMAGE_NAME=apache/airflow:slim-2.9.3
AIRFLOW_UID=1000
AIRFLOW_GID=1000
_AIRFLOW_WWW_USER_USERNAME=airflow
_AIRFLOW_WWW_USER_PASSWORD=changeme
```

3. Optional: Update the `dags` folder with your own dags
4. Optional: Update the `requirements.txt` file with your own dependencies
5. Run the whole airflow stack using:

```bash
docker compose up -d
# or
make up
```

> if you missed the `.env` setup, the default values will be used, which are not secure
> login: `airflow`, password: `airflow`

6. Access the Airflow webserver at `http://localhost:8080`

## update connections

Run this command to update connections: 

```bash
make update-connections
```

This will add/modify/remove the connections by tracking the `connections.json` file.

```json
{
  "your-conn-id-1": {
    "conn_type": "ssh",
    "description": "optional",
    "login": "required",
    "password": "required",
    "host": "xxx.xxx.xxx.xxx",
    "port": 22,
    "schema": "optional",
    "extra": "optional"
  },
}
```

Note that you should clear all connections in Admin -> Connections before run `make update-connections`.