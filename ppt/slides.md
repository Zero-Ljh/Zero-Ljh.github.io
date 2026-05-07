---
theme: default
aspectRatio: 16/9
transition: slide-left
katex: true
lang: zh-CN
fonts:
  sans: Microsoft YaHei
  mono: Cascadia Code, Consolas
---

<style>
.cover-slide {
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
}
.cover-slide h1 {
  font-size: 3.2rem !important;
  font-weight: 700 !important;
  margin: 0.8rem 0 !important;
  color: white !important;
  letter-spacing: 0.1em;
}
.cover-slide .sub {
  font-size: 1.4rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}
.cover-slide .toc {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 2.2;
}
.cover-slide .toc strong {
  color: #a78bfa;
}
.highlight {
  color: #7c3aed;
  font-weight: 600;
}

/* ===== 字体系统 ===== */
.slidev-layout h2 { font-size: 1.8rem !important; }
.slidev-layout p { font-size: 1.3rem !important; }
.slidev-layout li { font-size: 1.2rem !important; }
.slidev-layout pre { font-size: 1rem !important; }
.text-lg { font-size: 1.5rem !important; }
.text-body { font-size: 1.2rem !important; }
.text-sm { font-size: 1rem !important; }
.text-xs { font-size: 0.85rem !important; }

.result-box {
  background: #f8f6ff;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #7c3aed;
  font-family: Consolas, Cascadia Code, monospace;
  font-size: 0.85rem;
  margin-top: 8px;
}
</style>

<div class="cover-slide">
<img src="/wust-logo.png" style="width:80px;height:auto;margin-bottom:0.5rem;opacity:0.9;">
<h1>算法设计与分析</h1>
<p class="sub">第4章 · 基本的算法策略</p>
<p class="toc">
<strong>4.1 迭代算法</strong> · 4.2 蛮力法 · 4.3 分而治之算法<br>
4.4 贪婪算法 · 4.5 动态规划 · 4.6 算法策略间的比较
</p>
</div>

---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 迭代算法

<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;margin-top:2rem;">

<v-click>

<div style="padding:1rem 2rem;background:#f8f6ff;border-radius:12px;border-left:4px solid #7c3aed;margin-bottom:1rem;max-width:80%;">
基本思想：<strong>用旧值算新值</strong>，一般用于数值计算
</div>

</v-click>

<v-click>

<div style="padding:0.8rem 2rem;color:#555;margin-bottom:1.5rem;">
常见迭代策略：累加、累乘
</div>

</v-click>

<div style="display:flex;flex-direction:column;align-items:center;text-align:center;width:100%;">

<p style="font-weight:700;margin-bottom:0.5rem;">基本步骤：</p>

<div style="background:#fafafa;padding:1.5rem 2.5rem;border-radius:12px;text-align:left;">

<v-click><div style="padding:0.5rem 0;"><span style="display:inline-block;width:26px;height:26px;background:#7c3aed;color:white;border-radius:50%;text-align:center;line-height:26px;font-weight:700;margin-right:0.6rem;">1</span><span >确定迭代模型</span></div></v-click>
<v-click><div style="padding:0.5rem 0;"><span style="display:inline-block;width:26px;height:26px;background:#7c3aed;color:white;border-radius:50%;text-align:center;line-height:26px;font-weight:700;margin-right:0.6rem;">2</span><span >建立迭代关系式</span></div></v-click>
<v-click><div style="padding:0.5rem 0;"><span style="display:inline-block;width:26px;height:26px;background:#7c3aed;color:white;border-radius:50%;text-align:center;line-height:26px;font-weight:700;margin-right:0.6rem;">3</span><span >对迭代过程进行控制</span></div></v-click>
<v-click>
<div style="padding:0.5rem 0 0 2rem;color:#666;">
1.固定次数结束<br>
2.特定条件结束
</div>
</v-click>

</div>

</div>

</div>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 例1：兔子繁殖问题

<div style="display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:2rem;">

<v-click>

<div style="padding:0.8rem 1.5rem;background:#f8f6ff;border-radius:12px;border-left:4px solid #7c3aed;margin-bottom:0.6rem;max-width:92%;font-size:1.1rem;">
一对兔子从出生后第三个月开始，每月生一对小兔子。小兔子到第三个月又开始生下一代小兔子。假若兔子只生不死，一月份抱来一对刚出生的小兔子，问一年中每个月各有多少只兔子。
</div>

</v-click>

<v-click>

<div style="margin-bottom:0.5rem;font-size:0.9rem;line-height:1.8;">
月份：1月 &emsp;&emsp; 2月 &emsp;&emsp; 3月 &emsp;&emsp;&emsp; 4月 &emsp;&emsp;&emsp; 5月<br>
数量：1 &emsp;&emsp;&emsp; 1 &emsp;&emsp;&emsp; 1+1=2 &emsp;&emsp; 2+1=3 &emsp;&emsp; 3+2=5
</div>

</v-click>

<v-click>

**算法设计思路：**

</v-click>

<v-click>

1） **数学模型：** $y_1 = y_2 = 1,\; y_n = y_{n-1} + y_{n-2},\; n=3,4,\cdots$

</v-click>

<v-click>

2） **数据结构设计：**<br>
&emsp;使用数组存储 $y_n$<br>
&emsp;使用变量存储 $y_n$

</v-click>

</div>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 递推公式与循环不变式

<br>

<div style="text-align:center;">

<v-click>

$$y_n = y_{n-1} + y_{n-2}$$

</v-click>

<br>

<v-click>

<div style="display:inline-block;text-align:left;">

**变量说明：**  

- **a** — 前 2 个月的数量  
- **b** — 前 1 个月的数量  
- **c** — 当前月份的数量  

</div>

</v-click>

<br>

<v-click>

<div style="display:inline-block;text-align:left;margin-top:0.8rem;">

**循环不变式：**  $c = a + b$

```c
a = 1; b = 1;
for (i = 3; i <= N; i++) {
    c = a + b;
    a = b;
    b = c;
}
```

</div>

</v-click>

</div>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 兔子繁殖 — 完整代码

```c
#include <stdio.h>
#define MONTHS 12

int main() {
    int a = 1, b = 1, c;
    printf("第1月: 1\n第2月: 1\n");
    for (int i = 3; i <= MONTHS; i++) {
        c = a + b;
        printf("第%d月: %d\n", i, c);
        a = b;
        b = c;
    }
    return 0;
}
```

<v-click>

<div class="result-box">
<b>运行结果：</b><br>
第1月: 1　第2月: 1　第3月: 2　第4月: 3　第5月: 5　第6月: 8<br>
第7月: 13　第8月: 21　第9月: 34　第10月: 55　第11月: 89　第12月: 144
</div>

</v-click>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 例2：求两个整数的最大公约数

<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;margin-top:3rem;">

<v-click>

**算法设计思路：**

</v-click>

<br>

<v-click>

1） **短除法：** $\gcd(12, 18) = 2 \times 3 = 6$

</v-click>

<br>

<v-click>

2） **欧几里得算法（辗转相除法）：**
$$\gcd(m, n) = \gcd(n, m \bmod n)$$

**循环不变式：**
$$c = a \bmod b,\quad a = b,\quad b = c$$

</v-click>

</div>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 最大公约数 — 完整代码

```
main()
{ int a, b;
  input(a,b);
  if(b=0)
  {   print("data error");
  return;
  }
  else
  {    c = a mod b;
  while c<>0
  {   a=b;b=c;
  c=a mod b;
  }
  }
  print(b);
}
```

<v-click>

<div class="result-box">
<b>运行结果：</b><br>
gcd(18,12) = 6<br>
gcd(100,35) = 5
</div>

</v-click>

</div>
---

<div style="padding-top:1.5rem;font-size:1.3rem;">

## 倒推法

<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:4.5rem;">

<v-click>

<div style="padding:1.2rem 2.5rem;background:#f8f6ff;border-radius:12px;border-left:4px solid #7c3aed;margin-bottom:1.5rem;max-width:80%;">
<p style="color:#666;margin:0;">迭代法：正推，由前向后解问题</p>
</div>

</v-click>

<v-click>

<div style="padding:1.2rem 2.5rem;background:#fafafa;border-radius:12px;border-left:4px solid #7c3aed;max-width:80%;">
<p style="font-weight:700;color:#222;margin:0;">倒推法：从后往前推解问题</p>
<p style="color:#888;margin:0.3rem 0 0 0;">由结果反推初始状态</p>
</div>

</v-click>

</div>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 例1：猴子吃桃问题

<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;margin-top:2rem;">

<v-click>

<div style="padding:1rem 2rem;background:#f8f6ff;border-radius:12px;border-left:4px solid #7c3aed;margin-bottom:1rem;max-width:95%;">
一只小猴子摘了若干桃子，每天吃现有桃的一半多一个，到第10天时就只有一个桃子了，求原有多少个桃？
</div>

</v-click>

<v-click>

**倒推公式：**

$$a_{n-1} = (a_n + 1) \times 2$$

</v-click>

<v-click>

```c
int peach = 1;
for (int day = 10; day > 1; day--)
    peach = (peach + 1) * 2;
printf("原有 %d 个桃子\n", peach);
```

</v-click>

<v-click>

<div class="result-box">
<b>运行结果：</b>原有 1534 个桃子
</div>

</v-click>

</div>

</div>
---

<div style="padding-top:0.3rem;font-size:1.2rem;">

## 例2：杨辉三角形输出（用1维数组完成）

<v-click>

```
       1
      1 1
     1 2 1
    1 3 3 1
   1 4 6 4 1
```

**递推公式：** $A[i][j] = A[i-1][j-1] + A[i-1][j]$

</v-click>

<v-click>

**算法设计思路：**
1）一维数组 $A[1..i]$ 存储第 $i$ 行
2）正推法将会覆盖上一行对应的值，不能求下一个值
3）<span class="highlight">反推法</span>可以避免覆盖

</v-click>

<v-click>

**正推公式：**
$$A[1] = A[i] = 1$$
$$A[j] = A[j-1] + A[j],\quad j=2,3,\cdots,i-1$$

**反推公式（从右向左）：**
$$A[1] = A[i] = 1$$
$$A[j] = A[j-1] + A[j],\quad j=i-1,i-2,\cdots,2$$

</v-click>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 杨辉三角 — 正推失败 vs 反推成功

<div style="display:flex;gap:1.5rem;margin-top:0.5rem;">
<div style="flex:1;">

<v-click>

<div style="padding:12px;border-radius:8px;background:#fff0f0;border-left:4px solid #ef4444;">

**正推（覆盖上一行）❌**

```
A[j] = A[j-1] + A[j]

   1
  1 1
 1 2 1
1 3 4 1    ← 第4行出错
```

<v-click>

**正推累计误差 ❌**

```
   1
  1 1
 1 2 1
1 3 4 1
1 4 8 9 1  ← 错误越积越多
```

</v-click>

</div>

</v-click>

</div>
<div style="flex:1;">

<v-click>

<div style="padding:12px;border-radius:8px;background:#f0fff0;border-left:4px solid #22c55e;">

**反推（从右向左）✅**

```
A[j] = A[j-1] + A[j]

   1
  1 1
 1 2 1
1 3 3 1
```

</div>

</v-click>

</div>
</div>

<v-click>

```c
A[1] = A[i] = 1;                    // 首尾置1
for (int j = i - 1; j > 1; j--)     // 从右向左倒推
    A[j] = A[j-1] + A[j];
```

</v-click>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 例3：穿越沙漠问题

<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;margin-top:2rem;">

<v-click>

<div style="padding:1rem 1.5rem;background:#f8f6ff;border-radius:12px;border-left:4px solid #7c3aed;margin-bottom:1rem;max-width:90%;">
用一辆吉普车穿越 1000 km 沙漠。总装油量 500 加仑，耗油 1 加仑/km。沙漠中无油库，必须用这辆车在沙漠中建立临时油库。
</div>

</v-click>

<v-click>

<div style="font-weight:700;margin-bottom:0.5rem;color:#333;">最省油方案：</div>

</v-click>

<v-click>

<div style="padding:0.7rem 2rem;background:#fafafa;border-radius:12px;margin-bottom:0.6rem;max-width:80%;width:100%;">
<span style="display:inline-block;width:24px;height:24px;background:#7c3aed;color:white;border-radius:50%;text-align:center;line-height:24px;font-weight:700;margin-right:0.6rem;">1</span>每次从 a 点加满油出发
</div>

</v-click>

<v-click>

<div style="padding:0.7rem 2rem;background:#fafafa;border-radius:12px;margin-bottom:0.6rem;max-width:80%;width:100%;">
<span style="display:inline-block;width:24px;height:24px;background:#7c3aed;color:white;border-radius:50%;text-align:center;line-height:24px;font-weight:700;margin-right:0.6rem;">2</span>a–b 之间来回 <span style="color:#7c3aed;font-weight:700;">奇数次</span>，最后一次朝 b 点走
</div>

</v-click>

<v-click>

<div style="padding:0.7rem 2rem;background:#fafafa;border-radius:12px;max-width:80%;width:100%;">
<span style="display:inline-block;width:24px;height:24px;background:#7c3aed;color:white;border-radius:50%;text-align:center;line-height:24px;font-weight:700;margin-right:0.6rem;">3</span>a 点储油量 = a–b 之间耗油量 + b 点储油量
</div>

</v-click>

</div>

</div>
---

<div style="padding-top:0;font-size:1.25rem;">

## 穿越沙漠 — 数学模型与分段倒推

<div style="display:flex;gap:1.5rem;">
<div style="flex:1;">

<v-click>

**变量说明：**
- $k$ — 从 a 加满油向 b 出发的次数
- $2k-1$ — a–b 之间的来回次数
- $x$ — a–b 之间距离
- $S_1$ — a 加油点的储油量
- $S_2$ — b 加油点的储油量

</v-click>

</div>
<div style="flex:1;">

<v-click>

**数学模型：**
$$S_1 = 500k$$
$$S_2 = 500k - (2k-1)x$$

**算法设计：倒推法**

</v-click>

<v-click>

1）**第一段**<br>
$k=1,\; S_2=0,\; x=500,\; S_1=500$

</v-click>

<v-click>

2）**第二段**<br>
$k=2,\; S_1=1000,\; x=500/3$

</v-click>

<v-click>

3）**第三段**<br>
$k=3,\; S_1=1500,\; x=500/5$

</v-click>

<v-click>

4）**……** 直到 1000 km

</v-click>

</div>
</div>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 穿越沙漠 — 完整代码

```c
int main() {
    int dis = 500, k = 1, oil = 500;
    do {
        printf("第%d个油库: 距%4dkm 储%4d\n",
               k, 1000 - dis, oil);
        k++;
        dis += 500 / (2 * k - 1);
        oil = 500 * k;
    } while (dis < 1000);

    oil = 500 * (k - 1) + (1000 - dis) * (2 * k - 1);
    printf("起点: 距%4dkm 储%4d\n", 0, oil);
    return 0;
}
```

<v-click>

<div class="result-box">
<b>运行结果：</b><br>
第1个油库: 距500km 储500<br>
第2个油库: 距333km 储1000<br>
第3个油库: 距200km 储1500<br>
...<br>
起点: 距  0km 储3836
</div>

</v-click>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 迭代法解方程

<div style="margin-top:2rem;">

<v-click>

<div style="text-align:center;padding:1rem 1.2rem;background:#f8f6ff;border-radius:12px;border-left:4px solid #7c3aed;margin-bottom:1.2rem;">
<p style="color:#444;margin:0;">基本思想：<strong style="color:#7c3aed;">逐步逼近</strong>，从近似解到精确解</p>
</div>

</v-click>

<v-click>

**基本步骤：**

1. 确定初值 $x_0$
2. 建立迭代关系 $f(x) = 0 \;\rightarrow\; x = \varphi(x)$
3. 构造数列 $x_n = \varphi(x_{n-1})$
4. 重复迭代，直到满足停止条件 $|x_n - x_{n-1}| < \varepsilon$

</v-click>

</div>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 例1：迭代法求方程组根

<v-click>

**算法说明：** 方程组解的初值 $\mathbf{X} = (x_0, x_1, \cdots, x_{n-1})$

迭代关系方程组为：
$$x_i = g_i(\mathbf{X}) \quad (i=0,1,\cdots,n-1)$$

$w$ 为解的精度

</v-click>

<v-click>

**算法实现：**
```c
for (i = 0; i < n; i++)
    x[i] = 初始近似根;
do {
    k = k + 1;
    for (i = 0; i < n; i++)  y[i] = x[i];    // 保留旧值
    for (i = 0; i < n; i++)  x[i] = g[i]();  // 迭代计算
    for (c = i = 0; i < n; i++)
        c += fabs(y[i] - x[i]);               // 累计误差
} while (c > w && k < max_n);
for (i = 0; i < n; i++)
    printf("第%d个变量的近似根是: %f\n", i, x[i]);
```

</v-click>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 例2：牛顿迭代法求根

牛顿迭代法解求形如 $ax^3+bx^2+cx+d=0$ 方程的根

<v-click>

**原理：** 用切线近似代替曲线，逐步逼近根

$$f(x)=0$$

$$f(x_0) + f'(x_0)(x - x_0) \approx 0$$

$$x = x_0 - \frac{f(x_0)}{f'(x_0)}$$

</v-click>

<v-click>

**迭代公式：**
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

</v-click>

<v-click>

求解方程：
$$x^3 + 2x^2 + 3x + 4 = 0$$

牛顿迭代公式：
$$x_{n+1} = x_n - \frac{x_n^3+2x_n^2+3x_n+4}{3x_n^2+4x_n+3}$$

</v-click>

</div>
---

<div style="padding-top:0.5rem;font-size:1.3rem;">

## 牛顿迭代法 — 完整代码

```c
#include <stdio.h>
#include <math.h>

float f(float a, float b, float c, float d) {
    float x1 = 1, x0, f0, f1;
    do {
        x0 = x1;
        f0 = ((a * x0 + b) * x0 + c) * x0 + d;
        f1 = (3 * a * x0 + 2 * b) * x0 + c;
        x1 = x0 - f0 / f1;
    } while (fabs(x1 - x0) >= 1e-6);
    return x1;
}

int main() {
    float root = f(1, 2, 3, 4);
    printf("方程的根为: %.6f\n", root);
    return 0;
}
```

<v-click>

<div class="result-box">
<b>运行结果：</b>方程的根为: -1.650629
</div>

</v-click>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 例1：二分法求方程根

二分法求解 $\dfrac{x^3}{2} + 2x^2 - 8 = 0$ 在 $[0,1]$ 上的近似根

<v-click>

**前提条件：** $f(x)$ 在求解区间 $[a,b]$ 上连续，且 $f(a)$ 与 $f(b)$ 异号，即 $f(a) \cdot f(b) < 0$

</v-click>

<v-click>

**算法设计：**

1）$[a_0, b_0] = [a, b]$，$c_0 = \dfrac{a_0 + b_0}{2}$
   - 若 $f(c_0) = 0$，则 $c_0$ 为根
   - 若 $f(a_0) \cdot f(c_0) < 0$，则 $[a_1, b_1] = [a_0, c_0]$
   - 若 $f(b_0) \cdot f(c_0) < 0$，则 $[a_1, b_1] = [c_0, b_0]$

</v-click>

<v-click>

2）重复上述过程，当 $f(c_n) = 0$ 时，或区间 $[a_n, b_n]$ 足够小，就认为找到了方程的根

</v-click>

</div>
---

<div style="padding-top:1.8rem;font-size:1.3rem;">

## 二分法 — 完整代码

```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x / 2 + 2 * x * x - 8;
}

int main() {
    double x1 = 0, x2 = 2, x, f1, f2, fx;
    f1 = f(x1);  f2 = f(x2);

    if (f1 * f2 > 0) {
        printf("No root\n");
        return 0;
    }

    do {
        x = (x1 + x2) / 2;
        fx = f(x);
        if (fx == 0) break;
        if (f1 * fx > 0) { x1 = x; f1 = fx; }
        else             { x2 = x; f2 = fx; }
    } while (fabs(fx) >= 1e-4);

    printf("root = %.6f\n", x);
    return 0;
}
```

<v-click>

<div class="result-box">
<b>运行结果：</b>root = 1.670178
</div>

</v-click>

</div>