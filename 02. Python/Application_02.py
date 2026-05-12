v_num_01 = int(input("Insert 1st number: "))
v_num_02 = int(input("Insert 2nd number: "))

class calculator:
    def addition(self, num_1, num_2):
        return num_1 + num_2

obj = calculator()
result = obj.addition(v_num_01, v_num_02)
print("The sum is:", result)

