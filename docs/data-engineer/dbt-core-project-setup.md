# dbt-core project setup

> project folder name should be use lowercase and snake_case.

this example i used **bigquery** as the adapter name. 

find the adapter name at <a href="https://docs.getdbt.com/docs/trusted-adapters" target="_blank">docs.getdbt.com/docs/trusted-adapters</a>

## with `python3-venv`

it is recommended to use a virtual environment to install dbt, or you would break your system python packages.

```bash
ADAPTER_NAME=bigquery
echo -n "Enter your PROJECT_NAME: " && read PROJECT_NAME
echo "Creating a new dbt project named ${PROJECT_NAME} with ${ADAPTER_NAME} adapter"
mkdir ${PROJECT_NAME}
cd ${PROJECT_NAME}
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install dbt-core dbt-${ADAPTER_NAME}
dbt init ${PROJECT_NAME} --profiles-dir .
mv ${PROJECT_NAME}/* .
rm -r ${PROJECT_NAME}
```

## with `uv` (highly recommended)

```bash
ADAPTER_NAME=bigquery
echo -n "Enter your PROJECT_NAME: " && read PROJECT_NAME
echo "Creating a new dbt project named ${PROJECT_NAME} with ${ADAPTER_NAME} adapter"
uv init ${PROJECT_NAME}
cd ${PROJECT_NAME} && rm hello.py
uv add dbt
uv add dbt-${ADAPTER_NAME}
uv run dbt init ${PROJECT_NAME} --profiles-dir .
mv ${PROJECT_NAME}/* .
rm -r ${PROJECT_NAME}
```
