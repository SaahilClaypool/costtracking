SAA_PAYS = 0.6
SAR_PAYS = 0.4

def money(num):
    return f"${round(num, 2)}"

def owe(df):
    """
    df should have columns:

        Cost,What,Who,Date,Description
    """
    print(df)
    people = df.groupby("Who")

    total = df['Cost'].sum()

    saa_should = SAA_PAYS * total 
    sar_should = SAR_PAYS * total 

    print(f"Saahil should pay {SAA_PAYS * 100}% of {total} = {saa_should}")
    print(f"Sarah should pay {SAR_PAYS * 100}% of {total} = {sar_should}")

    saa_spent = 0
    sar_spent = 0

    for name, group in people:
        person_spent = group['Cost'].sum()
        if (name == "Saahil Claypool"):
            saa_spent = person_spent
        else:
            sar_spent = person_spent
            
    saa_str = f"Saahil payed {money(saa_spent)}, he owes sarah {money(saa_should - saa_spent)}"
    sar_str = f"Sarah payed {money(sar_spent)}, she owes saa {money(sar_should - sar_spent)}"
    return saa_str, sar_str


