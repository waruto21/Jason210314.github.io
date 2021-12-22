# CMake Tutorial


最近因为毕设的原因，需要看 Cpp 项目，首先项目构建就涉及到了 CMake，所以跟着 CMake 官网的 Tutorial 学习了一下，该文章算是官网教程的搬运。
[Tutorial 点这里](https://cmake.org/cmake/help/latest/guide/tutorial/index.html), [GitHub 代码点这里](https://github.com/Kitware/CMake/tree/master/Help/guide/tutorial).
<!-- more -->
# 构建简单项目

最基本的 CMake 项目是由源代码文件构建可执行文件。对于简单的项目，只需要一个三行的 CMakeLists.txt 文件。这将是我们 tutorial 的起点。

## 开始项目

```cmake
cmake_minimum_required(VERSION 3.10)

# set the project name
project(Tutorial)

# add the executable
add_executable(Tutorial tutorial.cxx)
```

源代码`tutorial.cxx`如下

```cpp
// A simple program that computes the square root of a number
#include <cmath>
#include <cstdlib>
#include <iostream>
#include <string>

int main(int argc, char* argv[])
{
  if (argc < 2) {
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
  }

  // convert input to double
  const double inputValue = atof(argv[1]);

  // calculate square root
  const double outputValue = sqrt(inputValue);
  std::cout << "The square root of " << inputValue << " is " << outputValue
            << std::endl;
  return 0;
}

```

## 添加版本号并配置头文件

添加版本号

```cmake
#set the project name and version
project(Tutorial VERSION 1.0)
```

然后，配置一个头文件，将版本号传递给源代码

```cmake
configure_file(TutorialConfig.h.in TutorialConfig.h)
```

由于配置的文件将被写入二叉树，所以我们必须将该目录添加到搜索 include 文件的路径列表中（该声明放在`add_executable`之后）:

```cmake
target_include_directories(Tutorial PUBLIC
                           "${PROJECT_BINARY_DIR}"
                           )
```

新建`TutorialConfig.h.in`

```cmake
// the configured options and settings for Tutorial
#define Tutorial_VERSION_MAJOR @Tutorial_VERSION_MAJOR@
#define Tutorial_VERSION_MINOR @Tutorial_VERSION_MINOR@
```

当 CMake 配置这个头文件时，@Tutorial_VERSION_MAJOR@和@Tutorial_VERSION_MINOR@的值将被替换。

接着，修改源代码，include 头文件`TutorialConfig.h`。然后，更新源代码打印出可执行文件的名称和版本号：

```cpp
 if (argc < 2) {
    // report version
    std::cout << argv[0] << " Version " << Tutorial_VERSION_MAJOR << "."
              << Tutorial_VERSION_MINOR << std::endl;
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
  }
```

指定使用 C++11 标准，使用`std::stod`

```cmake
cmake_minimum_required(VERSION 3.10)

# set the project name and version
project(Tutorial VERSION 1.0)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)
```

CMAKE_CXX_STANDARD 生命必须放在 add_executable 之前

## 构建并测试

首先构建

```bash
mkdir step1_build
cd step1_build
cmake ..
cmake --build .
```

然后测试

```bash
Tutorial 4294967296
Tutorial 10
Tutorial
```

# 添加一个库

我们将向项目中添加一个库。这个库将包含了自定义的平方根函数的实现。之后，在可执行文件中使用用这个库，替换编译器提供的标准平方根函数。

新建`MathFunctions`目录，在其下添加`CMakeLists.txt`,添加如下内容:

```cmake
add_library(MathFunctions mysqrt.cxx)
```

`mysqrt.cxx`如下：

```cpp
#include <iostream>

// a hack square root calculation using simple operations
double mysqrt(double x) {
    if (x <= 0) {
        return 0;
    }

    double result = x;

    // do ten iterations
    for (int i = 0; i < 10; ++i) {
        if (result <= 0) {
            result = 0.1;
        }
        double delta = x - (result * result);
        result = result + 0.5 * delta / result;
        std::cout << "Computing sqrt of " << x << " to be " << result
                  << std::endl;
    }
    return result;
}

```

为了使用新库，我们将在顶层的`CMakeLists.txt`文件中添加一个`add subdirectory()`调用，以便构建库。我们将新库添加到可执行文件中，并将`MathFunctions`添加为 include 目录，以便可以找到`mqsqrt.h`头文件。顶层的`CMakeLists.txt`文件的最后几行现在看起来应该是这样的：

```cmake
# add the MathFunctions library
add_subdirectory(MathFunctions)

# add the executable
add_executable(Tutorial tutorial.cxx)

target_link_libraries(Tutorial PUBLIC MathFunctions)

# add the binary tree to the search path for include files
# so that we will find TutorialConfig.h
target_include_directories(Tutorial PUBLIC
                          "${PROJECT_BINARY_DIR}"
                          "${PROJECT_SOURCE_DIR}/MathFunctions"
                          )
```

现在让我们把 MathFunctions 库变成可选的。虽然对于本教程来说，没有必要这样做，但对于大型项目来说，这是一种常见的情况。第一步是在顶层的 CMakeLists.txt 文件中添加一个选项（`option`放在`configure_file`前面）:

```cmake
option(USE_MYMATH "Use tutorial provided math implementation" ON)

# configure a header file to pass some of the CMake settings
# to the source code
configure_file(TutorialConfig.h.in TutorialConfig.h)
```

这个选项会在 `cmake-gui` 和 `ccmake` 中显示，默认值为 ON，用户可以更改。这个设置将被保存在缓存中，这样用户就不需要在每次运行 CMake 的时候设置这个值。

下一个步是使构建和链接`MathFunctions`库成为条件判断的。要做到这一点，我们将顶层`CMakeLists.txt`文件的结尾改为如下所示:

```cmake
if(USE_MYMATH)
  add_subdirectory(MathFunctions)
  list(APPEND EXTRA_LIBS MathFunctions)
  list(APPEND EXTRA_INCLUDES "${PROJECT_SOURCE_DIR}/MathFunctions")
endif()

# add the executable
add_executable(Tutorial tutorial.cxx)

target_link_libraries(Tutorial PUBLIC ${EXTRA_LIBS})

# add the binary tree to the search path for include files
# so that we will find TutorialConfig.h
target_include_directories(Tutorial PUBLIC
                           "${PROJECT_BINARY_DIR}"
                           ${EXTRA_INCLUDES}
                           )
```

请注意使用变量`EXTRA_LIBS`来收集任何可选的库，以便以后链接到可执行文件中。变量`EXTRA_INCLUDES`也同样用于处理可选的头文件。这是在处理许多可选组件时的传统方法，下一步讲介绍更为现代化方法。

相应的，需要简单修改源代码。首先，在`tutorial.cxx`中，如果我们需要的话，就加入`MathFunctions.h`头文件：

```cpp
#ifdef USE_MYMATH
#  include "MathFunctions.h"
#endif
```

然后，使用`USE_MYMATH`控制库函数的调用：

```cpp
#ifdef USE_MYMATH
  const double outputValue = mysqrt(inputValue);
#else
  const double outputValue = sqrt(inputValue);
#endif
```

由于源代码现在需要 `USE_MYMATH`， 我们可以在 `TutorialConfig.h.in`中加入下面这行:

```cpp
#cmakedefine USE_MYMATH
```

接下来，在构建时，可以使用`-D`添加使用选项，例如要关闭选项，使用：

```bash
cmake .. -DUSE_MYMATH=OFF
```

# 添加库的使用条件

使用条件允许更好地控制库或可执行文件的链接和`include`行，同时也给予 CMake 内部 target 的转义属性更多的控制。利用使用条件的主要命令有:

- [`target_compile_definitions()`](https://cmake.org/cmake/help/latest/command/target_compile_definitions.html#command:target_compile_definitions)
- [`target_compile_options()`](https://cmake.org/cmake/help/latest/command/target_compile_options.html#command:target_compile_options)
- [`target_include_directories()`](https://cmake.org/cmake/help/latest/command/target_include_directories.html#command:target_include_directories)
- [`target_link_libraries()`](https://cmake.org/cmake/help/latest/command/target_link_libraries.html#command:target_link_libraries)

让我们从步骤 2 开始中重构我们的代码，使用现代 CMake 的使用条件方法。我们首先声明，任何人链接到`MathFunctions`都需要包含当前目录，而`MathFunctions`本身不需要。所以这可以成为一个`INTERFACE`的使用条件。

记住，`INTERFACE`是指使用者需要而提供者不需要的东西。在`MathFunctions/CMakeLists.txt`的末尾添加以下几行:

```cmake
target_include_directories(MathFunctions
          INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}
          )
```

现在我们已经指定了 `MathFunctions`的使用条件，我们可以安全地从顶层的 `CMakeLists.txt`中删除对 `EXTRA_INCLUDES` 变量的使用。

此处

```cmake
if(USE_MYMATH)
    # add the MathFunctions library
    add_subdirectory(MathFunctions)
    list(APPEND EXTRA_LIBS MathFunctions)
endif()
```

和此处

```cmake
target_include_directories(Tutorial PUBLIC
                           "${PROJECT_BINARY_DIR}"
                           )
```

之后便可以重新构建项目了。

# 安装和测试

现在我们可以开始为我们的项目添加安装规则和测试支持。

## 安装规则

安装规则相当简单：对于`MathFunctions`，我们要安装库和头文件，对于应用程序，我们要安装可执行文件和配置的头文件。

所以在`MathFunctions/CMakeLists.txt`中添加：

```cmake
install(TARGETS MathFunctions DESTINATION lib)
install(FILES MathFunctions.h DESTINATION include)
```

在顶层的`CMakeLists.txt`中 添加：

```cmake
install(TARGETS Tutorial DESTINATION bin)
install(FILES "${PROJECT_BINARY_DIR}/TutorialConfig.h"
  DESTINATION include
  )
```

这就是为`tutorial`创建一个基本的本地安装所需要的全部内容。

现在重新来配置项目并构建它。然后在命令行使用`cmake` 命令的`install` 选项来运行安装步骤 (在 3.15 中引入，旧版本的 CMake 必须使用 make install)。对于多配置工具，不要忘记使用--config 参数来指定配置。如果使用 IDE，只需构建`INSTALL` target。这一步将安装相应的头文件、库和可执行文件。例如:

```bash
cmake --install .
```

CMake 变量 `CMAKE_INSTALL_PREFIX` 用于确定文件安装的根目录。如果使用 `cmake --install` 命令，安装目录可以通过 `--prefix`参数重写。例如：

```bash
cmake --install . --prefix "/home/myuser/installdir"
```

## 测试支持

接下来，测试我们的应用程序。在顶层的`CMakeLists.txt`文件的末尾，我们可以启用测试，然后添加一些基本测试以验证应用程序是否正常运行。

```cmake
enable_testing()

# does the application run
add_test(NAME Runs COMMAND Tutorial 25)

# does the usage message work?
add_test(NAME Usage COMMAND Tutorial)
set_tests_properties(Usage
  PROPERTIES PASS_REGULAR_EXPRESSION "Usage:.*number"
  )

# define a function to simplify adding tests
function(do_test target arg result)
  add_test(NAME Comp${arg} COMMAND ${target} ${arg})
  set_tests_properties(Comp${arg}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result}
    )
endfunction(do_test)

# do a bunch of result based tests
do_test(Tutorial 4 "4 is 2")
do_test(Tutorial 9 "9 is 3")
do_test(Tutorial 5 "5 is 2.236")
do_test(Tutorial 7 "7 is 2.645")
do_test(Tutorial 25 "25 is 5")
do_test(Tutorial -25 "-25 is [-nan|nan|0]")
do_test(Tutorial 0.0001 "0.0001 is 0.01")
```

第一个测试只是简单地验证应用程序是否运行，没有 segfault 或其他崩溃，并且返回值为零。这是 CTest 测试的基本形式。

下一个测试利用`PASS_REGULAR_EXPRESSION`测试属性来验证测试的输出是否包含某些字符串。在这种情况下，验证当提供的参数数量不正确时，是否会打印出使用信息。

最后，我们有一个名为 do_test 的函数，它运行应用程序并验证给定输入的计算平方根是否正确。每调用一次`do_test`，就会在项目中添加一个测试，包括名称、输入和基于传递的参数的预期结果。

重新构建应用程序，然后 cd 到二进制目录，运行`ctest`可执行文件：`ctest -N`（`--show-only[=format]`）和`ctest -VV`（`--extra-verbose`）。对于多配置生成器（如 Visual Studio），必须指定配置类型。例如，要在 Debug 模式下运行测试，从构建目录中使用`ctest -C Debug -VV`（不是 Debug 子目录！）。或者，从 IDE 中构建`RUN_TESTS`目标。

# 添加系统自检

让我们考虑在我们的项目中添加一些代码，这些代码取决于目标平台可能没有的功能。在这个例子中，我们将添加一些代码，这些代码取决于目标平台是否有 log 和 exp 函数。当然，几乎每个平台都有这些函数，但在本教程中，假设它们并不常见。

如果平台上有 log 和 exp，那么我们将使用它们来计算 mysqrt 函数中的平方根。我们首先使用顶层`CMakeLists.txt`中的`CheckSymbolExists`模块测试这些函数是否可用。在某些平台上，我们需要链接到`m`库。如果最初没有找到`log`和`exp`，则需要使用`m`库并再次尝试。

我们将使用`TutorialConfig.h.in`中的新定义，所以一定要在配置该文件之前设置它们。

如果系统上有`log`和`exp`，那么我们将在`mysqrt`函数中使用它们来计算平方根。在`MathFunctions/mysqrt.cxx`中的`mysqrt`函数中添加以下代码（在返回结果之前不要忘记`#endif`！）。

重新构建项目，会发现无论平台上是否有`log`和`exp`，都不会调用它们。因为我们忘记了在`mysqrt.cxx`中 include `TutorialConfig.h`。现在更新

我们还需要更新`MathFunctions / CMakeLists.txt`，以便`mysqrt.cxx`知道此文件的位置：

```cmake
target_include_directories(MathFunctions
          INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}
          PRIVATE ${CMAKE_BINARY_DIR}
          )
```

## 指定编译定义

除了在`TutorialConfig.h`中保存`HAVE_LOG`和`HAVE_EXP`值，我们还有更好的方法吗？让我们尝试使用`target_compile_definitions()`。

首先，从`TutorialConfig.h.in`中删除定义。我们不再需要在`mysqrt.cxx`中 include `TutorialConfig.h`或`MathFunctions/CMakeLists.txt`中的其他 include 内容。

接下来，我们可以将`HAVE_LOG`和`HAVE_EXP`的检查移至`MathFunctions/CMakeLists.txt`，然后将这些值指定为`PRIVATE`编译定义。

```cmake
include(CheckSymbolExists)
check_symbol_exists(log "math.h" HAVE_LOG)
check_symbol_exists(exp "math.h" HAVE_EXP)
if(NOT (HAVE_LOG AND HAVE_EXP))
  unset(HAVE_LOG CACHE)
  unset(HAVE_EXP CACHE)
  set(CMAKE_REQUIRED_LIBRARIES "m")
  check_symbol_exists(log "math.h" HAVE_LOG)
  check_symbol_exists(exp "math.h" HAVE_EXP)
  if(HAVE_LOG AND HAVE_EXP)
    target_link_libraries(MathFunctions PRIVATE m)
  endif()
endif()

# add compile definitions
if(HAVE_LOG AND HAVE_EXP)
  target_compile_definitions(MathFunctions
                             PRIVATE "HAVE_LOG" "HAVE_EXP")
endif()
```

之后再重新构建并运行项目，查看结果。

# 添加自定义命令和生成的文件

假设，作为本教程的目的，我们决定永远不要使用平台提供的`log`和`exp`函数，而是想生成一个预计算值的表，以便在`mysqrt`函数中使用。在本节中，我们将创建该表作为构建过程的一部分，然后将该表编译到我们的应用程序中。

首先，让我们删除`MathFunctions/CMakeLists.txt`中对`log`和`exp`函数的检查。然后从`mysqrt.cxx`中删除对`HAVE_LOG`和`HAVE_EXP`的检查。同时，我们可以删除`#include` 。

在`MathFunctions`子目录中，提供了一个名为`MakeTable.cxx`的新源文件来生成表。

查看完文件后，我们可以看到该表是作为有效的 C ++代码生成的，并且输出文件名作为参数传入。

```cpp
// A simple program that builds a sqrt table
#include <cmath>
#include <fstream>
#include <iostream>

int main(int argc, char *argv[]) {
    // make sure we have enough arguments
    if (argc < 2) {
        return 1;
    }

    std::ofstream fout(argv[1], std::ios_base::out);
    const bool fileOpen = fout.is_open();
    if (fileOpen) {
        fout << "double sqrtTable[] = {" << std::endl;
        for (int i = 0; i < 10; ++i) {
            fout << sqrt(static_cast<double>(i)) << "," << std::endl;
        }
        // close the table with a zero
        fout << "0};" << std::endl;
        fout.close();
    }
    return fileOpen ? 0 : 1; // return 0 if wrote the file
}
```

下一步是将适当的命令添加到`MathFunctions/CMakeLists.txt`文件中，以构建`MakeTable`可执行文件，然后在构建过程中运行它。需要一些命令来完成此操作。

首先，在`MathFunctions/CMakeLists.txt`的顶部，添加`MakeTable`的可执行文件，就像添加任何其他可执行文件一样。

```cmake
add_executable(MakeTable MakeTable.cxx)
```

然后，我们添加一个自定义命令，该命令指定如何通过运行`MakeTable`来产生`Table.h`。

```cmake
add_custom_command(
  OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/Table.h
  COMMAND MakeTable ${CMAKE_CURRENT_BINARY_DIR}/Table.h
  DEPENDS MakeTable
  )
```

接下来，我们必须让 CMake 知道`mysqrt.cxx`如何依赖生成的文件`Table.h`。通过将生成的`Table.h`添加到库`MathFunctions`的源列表中，可以完成此操作。

```cmake
add_library(MathFunctions
            mysqrt.cxx
            ${CMAKE_CURRENT_BINARY_DIR}/Table.h
            )
```

我们还必须将当前的二进制目录添加到包含目录列表中，以便`mysqrt.cxx`可以找到并包含`Table.h`。

```cmake
target_include_directories(MathFunctions
          INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}
          PRIVATE ${CMAKE_CURRENT_BINARY_DIR}
          )
```

现在，我们使用生成的表。首先，修改`mysqrt.cxx`以包含`Table.h`。接下来，我们可以重写`mysqrt`函数以使用该表：

```cpp
#include <iostream>
#include "MathFunctions.h"
#include "Table.h"

double mysqrt(double x) {
    if (x <= 0) {
        return 0;
    }

    // use the table to help find an initial value
    double result = x;
    if (x >= 1 && x < 10) {
        std::cout << "Use the table to help find an initial value "
                  << std::endl;
        result = sqrtTable[static_cast<int>(x)];
    }

    // do ten iterations
    for (int i = 0; i < 10; ++i) {
        if (result <= 0) {
            result = 0.1;
        }
        double delta = x - (result * result);
        result = result + 0.5 * delta / result;
        std::cout << "Computing sqrt of " << x << " to be " << result
                  << std::endl;
    }

    return result;
}
```

构建此项目时，它将首先构建`MakeTable`可执行文件。然后它将运行`MakeTable`生成`Table.h`。最后，它将编译包括`Table.h`的`mysqrt.cxx`，以生成`MathFunctions`库。

做完这些更新后，再继续构建项目。运行构建好的 Tutorial 可执行文件，并验证结果是否与前面相同。

# 构建安装程序

接下来假设我们想把我们的项目发布给其他人，以便他们能够使用它。我们希望在不同的平台上提供二进制和源代码的发布。这与我们之前在安装和测试（第 4 步）中所做的安装有些不同，在这里我们安装的是我们从源代码中构建的二进制文件。在这个例子中，我们将构建支持二进制安装和包管理功能的安装包。为了完成这个任务，我们将使用`CPack`来创建特定平台的安装包。具体来说，我们需要在顶层`CMakeLists.txt`文件的底部添加几行内容:

```cmake
include(InstallRequiredSystemLibraries)
set(CPACK_RESOURCE_FILE_LICENSE "${CMAKE_CURRENT_SOURCE_DIR}/License.txt")
set(CPACK_PACKAGE_VERSION_MAJOR "${Tutorial_VERSION_MAJOR}")
set(CPACK_PACKAGE_VERSION_MINOR "${Tutorial_VERSION_MINOR}")
include(CPack)
```

首先包含`InstallRequiredSystemLibraries`。这个模块将包含项目在当前平台上需要的任何运行时库。接下来，我们设置一些`CPack`变量，将这个项目的许可证和版本信息存储在那里。版本信息在本教程的前面已经设置好了，`license.txt`已经包含在本步骤的顶层源目录中:

```bash
This is the open source License.txt file introduced in
CMake/Tutorial/Step7...
```

最后我们加入`CPack`模块，它将使用这些变量和当前系统的一些其他属性来设置安装程序。

下一步是以通常的方式构建项目，然后运行`cpack`可执行文件。要构建一个二进制发行版，请在二进制目录下运行。

要指定生成器，请使用`-G`选项。对于多配置的构建，使用`-C`来指定配置。例如：

```bash
cpack -G ZIP -C Debug
```

要创建一个源码分发，可以输入：

```bash
cpack --config CPackSourceConfig.cmake
```

或者，运行`make package`或右键点击`Package` target 并从 IDE 中构建项目。

运行在二进制目录下找到的安装程序。然后运行已安装的可执行文件，并验证它是否工作。

# 添加 DashBoard 支持

添加支持将我们的测试结果提交到 dashboard 很简单。我们已经为我们的项目定义了一些测试。现在我们只需要运行这些测试并将它们提交到仪表板。为了包含对仪表盘的支持，我们在顶层的`CMakeLists.txt`中加入了`CTest`模块:

将`enable_testing()`替换为`include(CTest)`。

`CTest`模块会自动调用`enable_testing()`，所以我们可以从`CMake`文件中删除它。

我们还需要在顶层目录下创建一个`CTestConfig.cmake`文件，在这里我们可以指定项目的名称和提交`dashboard`的位置。

```cmake
set(CTEST_PROJECT_NAME "CMakeTutorial")
set(CTEST_NIGHTLY_START_TIME "00:00:00 EST")

set(CTEST_DROP_METHOD "http")
set(CTEST_DROP_SITE "my.cdash.org")
set(CTEST_DROP_LOCATION "/submit.php?project=CMakeTutorial")
set(CTEST_DROP_SITE_CDASH TRUE)
```

当`ctest`可执行文件运行时，它将读取这个文件。要创建一个简单的 dashboard，你可以运行`cmake`可执行文件或`cmake-gui`来配置项目，但先不要构建它。切换到二叉树状目录，然后运行。

```bash
ctest [-VV] -D Experimental
```

请记住，对于多配置生成器（如 Visual Studio），必须指定配置类型。

# 混合静态和共享

在这一节中，将展示如何使用`BUILD_SHARED_LIBS`变量来控制`add_library()`的默认行为，并允许控制没有明确类型(`STATIC, SHARED, MODULE or OBJECT`)的库的构建方式。

为了达到这个目的，我们需要在顶层的`CMakeLists.txt`中添加`BUILD_SHARED_LIBS`。我们使用`option()`命令，因为它允许用户选择性地选择该值是否应该是 ON 或 OFF。

接下来我们将重构 `MathFunctions`， 使其成为一个真正的库， 封装使用 `mysqrt` 或 `sqrt`， 而不是要求调用代码来完成这个逻辑。这也意味着 `USE_MYMATH`将不会控制构建 `MathFunctions`，而是控制这个库的行为。

第一步是更新顶层`CMakeLists.txt`的起始部分， 使其看起来像这样:

```cmake
cmake_minimum_required(VERSION 3.10)

# set the project name and version
project(Tutorial VERSION 1.0)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# control where the static and shared libraries are built so that on windows
# we don't need to tinker with the path to run the executable
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}")

option(BUILD_SHARED_LIBS "Build using shared libraries" ON)

# configure a header file to pass the version number only
configure_file(TutorialConfig.h.in TutorialConfig.h)

# add the MathFunctions library
add_subdirectory(MathFunctions)

# add the executable
add_executable(Tutorial tutorial.cxx)
target_link_libraries(Tutorial PUBLIC MathFunctions)
```

现在我们已经让`MathFunctions`始终被使用，接下来需要更新该库的逻辑。因此， 在 `MathFunctions/CMakeLists.txt`中， 我们需要创建一个 `SqrtLibrary`， 当 `USE_MYMATH` 启用时， 这个`SqrtLibrary`将有条件地被构建和安装。由于这是一个教程， 我们将明确要求静态地构建 `SqrtLibrary`。

最终的结果是`MathFunctions/CMakeLists.txt` 应该是这样的:

```cmake
# add the library that runs
add_library(MathFunctions MathFunctions.cxx)

# state that anybody linking to us needs to include the current source dir
# to find MathFunctions.h, while we don't.
target_include_directories(MathFunctions
                           INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}
                           )

# should we use our own math functions
option(USE_MYMATH "Use tutorial provided math implementation" ON)
if(USE_MYMATH)

  target_compile_definitions(MathFunctions PRIVATE "USE_MYMATH")

  # first we add the executable that generates the table
  add_executable(MakeTable MakeTable.cxx)

  # add the command to generate the source code
  add_custom_command(
    OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/Table.h
    COMMAND MakeTable ${CMAKE_CURRENT_BINARY_DIR}/Table.h
    DEPENDS MakeTable
    )

  # library that just does sqrt
  add_library(SqrtLibrary STATIC
              mysqrt.cxx
              ${CMAKE_CURRENT_BINARY_DIR}/Table.h
              )

  # state that we depend on our binary dir to find Table.h
  target_include_directories(SqrtLibrary PRIVATE
                             ${CMAKE_CURRENT_BINARY_DIR}
                             )

  target_link_libraries(MathFunctions PRIVATE SqrtLibrary)
endif()

# define the symbol stating we are using the declspec(dllexport) when
# building on windows
target_compile_definitions(MathFunctions PRIVATE "EXPORTING_MYMATH")

# install rules
set(installable_libs MathFunctions)
if(TARGET SqrtLibrary)
  list(APPEND installable_libs SqrtLibrary)
endif()
install(TARGETS ${installable_libs} DESTINATION lib)
install(FILES MathFunctions.h DESTINATION include)

```

接下来，更新 `MathFunctions/mysqrt.cxx`，使用 `mathfunctions`和 `detail` 命名空间。

```cpp
#include <iostream>
#include "MathFunctions.h"
#include "Table.h"

namespace mathfunctions {
namespace detail {
double mysqrt(double x) {
    if (x <= 0) {
        return 0;
    }

    double result = x;
    if (x >= 1 && x < 10) {
        std::cout << "Use the table to help find an initial value "
                  << std::endl;
        result = sqrtTable[static_cast<int>(x)];
    }

    // do ten iterations
    for (int i = 0; i < 10; ++i) {
        if (result <= 0) {
            result = 0.1;
        }
        double delta = x - (result * result);
        result = result + 0.5 * delta / result;
        std::cout << "Computing sqrt of " << x << " to be " << result
                  << std::endl;
    }

    return result;
}
} // namespace detail
} // namespace mathfunctions
```

我们还需要在 `tutorial.cxx`中做一些修改， 使它不再使用 `USE_MYMATH`:

- 始终 include `MathFunctions.h`

- 始终使用 `mathfunctions::sqrt`

- 不要 include `cmath`

`mysqrt.h`如下：

```cpp
namespace mathfunctions {
namespace detail {
double mysqrt(double x);
}
} // namespace mathfunctions

```

`MathFunctions.cxx`如下：

```cpp
#include "MathFunctions.h"

#include <cmath>

#ifdef USE_MYMATH
#include "mysqrt.h"
#endif

namespace mathfunctions {
double sqrt(double x) {
#ifdef USE_MYMATH
    return detail::mysqrt(x);
#else
    return std::sqrt(x);
#endif
}
} // namespace mathfunctions

```

最后，更新`MathFunctions/MathFunctions.h`，使用 dll 导出定义：

```cpp
#if defined(_WIN32)
#if defined(EXPORTING_MYMATH)
#define DECLSPEC __declspec(dllexport)
#else
#define DECLSPEC __declspec(dllimport)
#endif
#else // non windows
#define DECLSPEC
#endif

namespace mathfunctions {
double DECLSPEC sqrt(double x);
}
```

此时，如果你构建了所有的东西，你可能会注意到链接失败，因为我们将一个没有地址无关代码的静态库与一个有地址无关的库结合在一起。解决这个问题的方法是，无论构建类型如何，都要显式地将`SqrtLibrary`的`POSITION_INDEPENDENT_CODE`目标属性设置为 True。

```cmake
# state that SqrtLibrary need PIC when the default is shared libraries
set_target_properties(SqrtLibrary PROPERTIES
											POSITION_INDEPENDENT_CODE ${BUILD_SHARED_LIBS}
											)

target_link_libraries(MathFunctions PRIVATE SqrtLibrary)
```

# 添加生成器表达式

在构建系统生成期间会执行`Generator expression`，以生成特定于每个构建配置的信息。

在许多目标属性（例如`LINK_LIBRARIES`，`INCLUDE_DIRECTORIES`，`COMPLIE_DEFINITIONS`等）的上下文中允许`Generator expression`。在使用命令填充这些属性（例如`target_link_libraries()`，`target_include_directories()`，`target_compile_definitions()`等）时，也可以使用它们。

`Generator expression`可用于启用条件链接、编译时使用的条件定义、条件 include 目录等。这些条件可以基于构建配置、目标属性、平台信息或任何其他可查询的信息。

有不同类型的`Generator expression`，包括逻辑表达式、信息表达式和输出表达式。

逻辑表达式用于创建条件输出。基本的表达式是 0 和 1 表达式。`$<0:...>`的结果是空字符串，`<1:...>`的结果是`"... "`的内容。它们也可以嵌套。

`Generator expression`的一个常见用法是有条件地添加编译器标志，例如语言级别或警告的标志。一个很好的模式是将这些信息关联到一个`INTERFACE`目标，允许这些信息传播。让我们从构造一个`INTERFACE`目标开始，并指定所需的 C++标准为 11，而不是使用`CMAKE_CXX_STANDARD`。

原代码如下：

```cmake
# specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)
```

替换为：

```cmake
add_library(tutorial_compiler_flags INTERFACE)
target_compile_features(tutorial_compiler_flags INTERFACE cxx_std_11)
```

接下来，我们为项目添加所需的编译器警告标志。由于警告标志因编译器而异，因此我们使用`COMPILE_LANG_AND_ID`生成器表达式来控制在给定语言和一组编译器 ID 的情况下应应用的标志，如下所示：

```cmake
set(gcc_like_cxx "$<COMPILE_LANG_AND_ID:CXX,ARMClang,AppleClang,Clang,GNU>")
set(msvc_cxx "$<COMPILE_LANG_AND_ID:CXX,MSVC>")
target_compile_options(tutorial_compiler_flags INTERFACE
  "$<${gcc_like_cxx}:$<BUILD_INTERFACE:-Wall;-Wextra;-Wshadow;-Wformat=2;-Wunused>>"
  "$<${msvc_cxx}:$<BUILD_INTERFACE:-W3>>"
)
```

查看此内容，我们看到警告标志封装在`BUILD_INTERFACE`条件内。这样做是为了使我们已安装项目的使用者不会继承我们的警告标志。

# 添加导出配置

在教程的“安装和测试”中，我们添加了 CMake 安装项目的库和头文件的功能。在”构建安装程序“期间，我们添加了打包这些信息的功能，以便可以将其分发给其他人。

下一步是添加必要的信息，以便其他 CMake 项目可以使用我们的项目，无论是从构建目录，本地安装还是打包时。

第一步是更新我们的`install（TARGETS）`命令，不仅要指定`DESTINATION`，还要指定`EXPORT`。 `EXPORT`关键字生成并安装一个`CMake`文件，该文件包含用于从安装树中导入`install`命令中列出的所有目标的代码。因此，让我们继续，通过更新`MathFunctions/CMakeLists.txt`中的`install`命令，显式导出`MathFunctions`库，如下所示：

现在我们已经导出了`MathFunctions`，我们还需要显式安装生成的`MathFunctionsTargets.cmake`文件。通过将以下内容添加到顶层的`CMakeLists.txt`的底部来完成：

```cmake
install(EXPORT MathFunctionsTargets
  FILE MathFunctionsTargets.cmake
  DESTINATION lib/cmake/MathFunctions
)
```

然后尝试构建项目，应该会遇到类似下面的错误：

```bash
CMake Error in MathFunctions/CMakeLists.txt:
  Target "MathFunctions" INTERFACE_INCLUDE_DIRECTORIES property contains
  path:

    "/Users/wmc/vscode/cmake/tutorial/MathFunctions"

  which is prefixed in the source directory.
```

CMake 试图说的是，在生成导出信息的过程中，它将导出与当前机器上的绝对路径，在其他机器上无效。解决方案是更新`MathFunctions`的 `target_include_directories()`，以让 CMake 了解当从构建目录内和从安装/包中使用时，它需要不同的 INTERFACE 位置。这意味着将`MathFunctions`的`target_include_directories()`调用转换为如下样子:

```cmake
target_include_directories(MathFunctions
                           INTERFACE
                            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
                            $<INSTALL_INTERFACE:include>
                           )
```

修改后重新运行 CMake，应该不会再有警告了。

此时，我们已经让 CMake 正确地打包了所需的目标信息，但我们仍然需要生成一个`MathFunctionsConfig.cmake`，这样`CMake find_package()`命令才能找到我们的项目。所以我们继续在项目的顶层添加一个新文件，名为`Config.cmake.in`，内容如下。

```cmake
@PACKAGE_INIT@

include ( "${CMAKE_CURRENT_LIST_DIR}/MathFunctionsTargets.cmake" )
```

然后，为了正确配置和安装该文件，在顶层`CMakeLists.txt`的底部添加以下内容:

```cmake
include(CMakePackageConfigHelpers)
# generate the config file that is includes the exports
configure_package_config_file(${CMAKE_CURRENT_SOURCE_DIR}/Config.cmake.in
  "${CMAKE_CURRENT_BINARY_DIR}/MathFunctionsConfig.cmake"
  INSTALL_DESTINATION "lib/cmake/example"
  NO_SET_AND_CHECK_MACRO
  NO_CHECK_REQUIRED_COMPONENTS_MACRO
  )
# generate the version file for the config file
write_basic_package_version_file(
  "${CMAKE_CURRENT_BINARY_DIR}/MathFunctionsConfigVersion.cmake"
  VERSION "${Tutorial_VERSION_MAJOR}.${Tutorial_VERSION_MINOR}"
  COMPATIBILITY AnyNewerVersion
)

# install the configuration file
install(FILES
  ${CMAKE_CURRENT_BINARY_DIR}/MathFunctionsConfig.cmake
  DESTINATION lib/cmake/MathFunctions
  )
```

此时，我们已经为我们的项目生成了一个可重定位的 CMake 配置，可以在项目安装或打包后使用。如果我们希望我们的项目也能在构建目录下使用，我们只需要在顶层 `CMakeLists.txt`的底部添加以下内容:

通过这个`export`调用，我们现在可以生成一个`Targets.cmake`，允许构建目录下配置的`MathFunctionsConfig.cmake`被其他项目使用，而不需要安装它。

# 打包 Debug 和 Release

注意：这个例子对单配置生成器有效，对多配置生成器（如 Visual Studio）无效。

默认情况下，CMake 的模型是一个构建目录只包含一个配置，无论是 Debug、Release、MinSizeRel，还是 RelWithDebInfo。然而，我们可以设置 CPack 来捆绑多个构建目录，并构建一个包含同一项目多个配置的包。

首先，我们要确保 Debug 版本和 Release 版本构建的可执行文件和库使用不同的名称。让我们使用 d 作为 Debug 版可执行文件和库的后缀。

在顶层的`CMakeLists.txt`文件开始处添加：

```cmake
set(CMAKE_DEBUG_POSTFIX d)

add_library(tutorial_compiler_flags INTERFACE)
```

以及`TUtorial`可执行文件上的 DEBUG_POSTFIX 属性:

```cmake
add_executable(Tutorial tutorial.cxx)
set_target_properties(Tutorial PROPERTIES DEBUG_POSTFIX ${CMAKE_DEBUG_POSTFIX})

target_link_libraries(Tutorial PUBLIC MathFunctions)
```

我们也给`MathFunctions`库添加版本号。在`MathFunctions/CMakeLists.txt`中，设置`VERSION`和`SOVERSION`属性:

```cmake
set_property(TARGET MathFunctions PROPERTY VERSION "1.0.0")
set_property(TARGET MathFunctions PROPERTY SOVERSION "1")
```

在项目根目录下：

```bash
mkdir -p step12_build/{debug,release}
```

现在我们需要设置 debug 和 release 版本。我们可以使用`CMAKE_BUILD_TYPE`来设置配置类型：

```bash
cd debug
cmake -DCMAKE_BUILD_TYPE=Debug ../..
cmake --build .
cd ../release
cmake -DCMAKE_BUILD_TYPE=Release ../..
cmake --build .
```

现在调试和发行版的构建都已经完成，我们可以使用一个自定义的配置文件将两个构建打包成一个发行版。在 step12_build 目录下，创建一个名为`MultiCPackConfig.cmake`的文件。在这个文件中，首先包含 cmake 可执行文件创建的默认配置文件

接下来，使用`CPACK_INSTALL_CMAKE_PROJECTS`变量来指定要安装的项目。在本例中，我们希望同时安装 debug 和 release 版本：

```cmake
include("release/CPackConfig.cmake")

set(CPACK_INSTALL_CMAKE_PROJECTS
    "debug;Tutorial;ALL;/"
    "release;Tutorial;ALL;/"
    )
```

在 step12_build 目录下，运行`cpack`，用`config`选项指定我们的自定义配置文件:

```bash
cpack --config MultiCPackConfig.cmake
```

