#include <iostream>
#include <vector>
#include <string>
#include <memory>

// Macro definition
#define SQUARE(x) ((x) * (x))

// Namespace declaration
namespace MyNamespace {
    // Enumeration
    enum class Color {
        Red,
        Green,
        Blue
    };

    // Forward declaration
    class MyClass;

    // Template class
    template <typename T>
    class Container {
    public:
        void add(const T& item) {
            items.push_back(item);
        }
        T get(size_t index) const {
            return items.at(index);
        }

    private:
        std::vector<T> items;
    };

    // Function template
    template <typename T>
    T multiply(T a, T b) {
        return a * b;
    }
}

// Class definition
class MyNamespace::MyClass {
public:
    MyClass(int value) : value(value) {}

    void setValue(int newValue) {
        value = newValue;
    }

    int getValue() const {
        return value;
    }

    static void printStaticMessage() {
        std::cout << "Static function called!" << std::endl;
    }

private:
    int value;
};

// Free function
void printColor(MyNamespace::Color color) {
    switch (color) {
    case MyNamespace::Color::Red:
        std::cout << "Red" << std::endl;
        break;
    case MyNamespace::Color::Green:
        std::cout << "Green" << std::endl;
        break;
    case MyNamespace::Color::Blue:
        std::cout << "Blue" << std::endl;
        break;
    }
}

// Operator overload
MyNamespace::MyClass operator+(const MyNamespace::MyClass& a, const MyNamespace::MyClass& b) {
    return MyNamespace::MyClass(a.getValue() + b.getValue());
}

// Lambda function
auto createMultiplier(int factor) {
    return [factor](int x) { return x * factor; };
}

int main() {
    // Primitive types and variables
    int a = 5;
    double b = 3.14;
    const char* msg = "Hello, C++!";

    // Macro usage
    int square = SQUARE(a);

    // Namespace and enum usage
    MyNamespace::Color color = MyNamespace::Color::Green;
    printColor(color);

    // Class usage
    MyNamespace::MyClass obj1(10);
    MyNamespace::MyClass obj2(20);
    MyNamespace::MyClass obj3 = obj1 + obj2;
    obj3.setValue(50);
    std::cout << "Object value: " << obj3.getValue() << std::endl;

    // Static function call
    MyNamespace::MyClass::printStaticMessage();

    // Smart pointers
    std::unique_ptr<MyNamespace::MyClass> ptr = std::make_unique<MyNamespace::MyClass>(100);
    std::cout << "Smart pointer value: " << ptr->getValue() << std::endl;

    // Template usage
    MyNamespace::Container<std::string> stringContainer;
    stringContainer.add("Hello");
    stringContainer.add("World");
    std::cout << "First item: " << stringContainer.get(0) << std::endl;

    // Function template
    int result = MyNamespace::multiply<int>(3, 4);
    std::cout << "Multiplication result: " << result << std::endl;

    // Lambda usage
    auto multiplier = createMultiplier(3);
    std::cout << "Lambda result: " << multiplier(10) << std::endl;

    return 0;
}