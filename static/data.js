export default [{
    name: "max",
    subtitle: "寻找向量或矩阵每行(列)的最大元素",
    info: `
       <li>
        <span class="wave">功能详解</span>：类似于matlab中的max函数，可以对向量或者矩阵中的元素进行最大值元素查找功能，其中还支持列查找以及行查找，上方编辑器给出了一个对于4×11的矩阵进行列最大值查找，最终返还一个向量存储了每一个列中的最大值，左侧给出了该云函数具体实现代码。
      </li>
      <li>
        <span class="emp">参数 k </span>：取0则为对向量或者矩阵中每一列取最大值，取1则为对向量或者矩阵中每一行取最大值
      </li>
      <li>
        <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
      </li>
      `,
    url: "/max",
    json: `{
"k": 0,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np
def handler (event, context):
s=json.loads(str(base64.b64decode(json.dumps(event["body"])),encoding="utf-8"))
# 输入的数据中None都转换为nan，同时数据都变为了浮点型
a=np.array(s['data'],dtype=np.float)
k=s['k']
# 取最大值
ans=process(np.max(a,axis=k))
result={ 'ans': ans}
return {
    "statusCode": 200,
    "isBase64Encoded": False,
    "body": json.dumps(result),
    "headers": {
        "Content-Type": "application/json"
    }
}

def process(x):
shape=np.shape(x)
if(len(shape)==0):
    return "None" if np.isnan(x) else str(x)
elif(len(shape)==1):
    return [None if np.isnan(i) else i for i in x]
elif(len(shape)==2):
    # 对二维向量中的nan进行替换为None
    # 取出每一行
    ans=[]
    for row in x:
        ans.append([None if np.isnan(i) else i for i in row])
    return ans
        
    
`,
  },
  {
    name: "min",
    subtitle: "寻找向量或矩阵每行(列)的最小元素",
    info: `
        <li>
        <span class="wave">功能详解</span>：类似于matlab中的max函数，可以对向量或者矩阵中的元素进行最小值元素查找功能，其中还支持列查找以及行查找，上方编辑器给出了一个对于4×11的矩阵进行列最大值查找，最终返还一个向量存储了每一个列中的最大值，左侧给出了该云函数具体实现代码。
      </li>
      <li>
        <span class="emp">参数 k </span>：取0则为对向量或者矩阵中每一列取最小值，取1则为对向量或者矩阵中每一行取最小值
      </li>
      <li>
        <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
      </li>
      `,
    url: "/min",
    json: `{
"k": 0,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np
def handler (event, context):
    s=json.loads(str(base64.b64decode(json.dumps(event["body"])),encoding="utf-8"))
    a=np.array(s['data'],dtype=np.float)
    k=s['k']
    ans=process(np.min(a,axis=k))
    result={'ans': ans}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }

def process(x):
    shape=np.shape(x)
    if(len(shape)==0):
        return "None" if np.isnan(x) else str(x)
    elif(len(shape)==1):
        return [None if np.isnan(i) else i for i in x]
    elif(len(shape)==2):
        # 对二维向量中的nan进行替换为None
        # 取出每一行
        ans=[]
        for row in x:
            ans.append([None if np.isnan(i) else i for i in row])
        return ans
      `
  },
  {
    name: 'maxk',
    subtitle: '计算 k 个最大元素',
    info: ` <li>
      <span class="wave">功能详解</span>：类似于matlab中的maxk函数，可以对向量或者矩阵中的元素进行K个最大值查找功能。
      如果 data 是向量，则 maxk 返回一个向量，其中包含 data 的 k 个最大元素。
      如果 data 是矩阵，则 maxk 返回一个矩阵，此矩阵的列中包含 data 的每一列中的 k 个最大元素。
      如果 data 是多维数组，则 maxk 返回大小不等于 1 的第一个维度上的 k 个最大元素，左侧给出了该云函数具体实现代码。
    </li>
    <li>
      <span class="emp">参数 k </span>：返回的最大元素的个数。
    </li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/maxk',
    json: `{
"k": 3,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
    import json
    import base64
    import numpy as np
    def handler (event, context):
        s=json.loads(str(base64.b64decode(json.dumps(event['body'])),encoding="utf-8"))
        k=s['k']
        a=np.array(s['data'],dtype=np.float)
        l=len(a[0])
        midans=[]
        ans=[]
        if(k<=l):
            for i in range(0,len(a)):
                sa=np.sort(a[i])
                fsa=np.flipud(sa)
                for j in range(0,k):
                    midans.append(fsa[j])
                ans.append(midans)
                midans=[]
            ans=process(np.array(ans))
            result={'ans': ans}
        else:
            result={'ans': 'error!'}
        return {
            "statusCode": 200,
            "isBase64Encoded": False,
            "body": json.dumps(result),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    
    def process(x):
        shape=np.shape(x)
        if(len(shape)==0):
            return "None" if np.isnan(x) else str(x)
        elif(len(shape)==1):
            return [None if np.isnan(i) else i for i in x]
        elif(len(shape)==2):
            # 对二维向量中的nan进行替换为None
            # 取出每一行
            ans=[]
            for row in x:
                ans.append([None if np.isnan(i) else i for i in row])
            return ans`
  },
  {
    name: 'mink',
    subtitle: '计算 k 个最小元素',
    info: ` <li>
      <span class="wave">功能详解</span>：类似于matlab中的mink函数，可以对向量或者矩阵中的元素进行K个最小值查找功能。
      如果 data 是向量，则 mink 返回一个向量，其中包含 data 的 k 个最小元素。
      如果 data 是矩阵，则 mink 返回一个矩阵，此矩阵的列中包含 data 的每一列中的 k 个最小元素。
      如果 data 是多维数组，则 mink 返回大小不等于 1 的第一个维度上的 k 个最小元素，左侧给出了该云函数具体实现代码。
    </li>
    <li>
      <span class="emp">参数 k </span>：返回的最小元素的个数。
    </li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/mink',
    json: `{
"k": 3,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
    import json
    import base64
    import numpy as np
    
    def handler (event, context):
        s=json.loads(str(base64.b64decode(json.dumps(event["body"])),encoding="utf-8"))
        k=s['k']
        a=np.array(s['data'],dtype=np.float)
        l=len(a[0])
        n=len(a)
        midans=[]
        ans=[]
        if(k<=l):
            for i in range(0,n):
                sa=np.sort(a[i])
                for j in range(0,k):
                    midans.append(sa[j])
                ans.append(midans)
                midans=[]
            ans=process(np.array(ans))
            result={'ans': ans}
        else:
            result={"ans": "error!"}
    
        return {
            "statusCode": 200,
            "isBase64Encoded": False,
            "body": json.dumps(result),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    
    def process(x):
        shape=np.shape(x)
        if(len(shape)==0):
            return "None" if np.isnan(x) else str(x)
        elif(len(shape)==1):
            return [None if np.isnan(i) else i for i in x]
        elif(len(shape)==2):
            # 对二维向量中的nan进行替换为None
            # 取出每一行
            ans=[]
            for row in x:
                ans.append([None if np.isnan(i) else i for i in row])
            return ans`
  },
  {
    name: 'corrcoef',
    subtitle: '计算相关系数',
    info: `
      <li>
      <span class="wave">功能详解</span>：返回 矩阵 data 的相关系数的矩阵，其中 data 的列表示随机变量，行表示观测值，左侧给出了该云函数具体实现代码。
    </li>
    <li><span class="emp">参数 k </span>：如果k=1（默认值），则每行代表一个变量，并在列中显示。否则，转换关系：每列代表一个变量，而行包含观察。</li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/corrcoef',
    json: `{
"k": 1,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np
def handler (event, context):
    s=json.loads(str(base64.b64decode(json.dumps(event['body'])),encoding='utf-8'))
    a=np.array(s['data'])
    k=s['k']
    ans=[]
    if(k==1):
        ans=process(np.corrcoef(a))
    elif(k==0):
        ans=process(np.corrcoef(a,rowvar=False))

    result={'ans': ans}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }

def process(x):
    shape=np.shape(x)
    if(len(shape)==0):
        return "None" if np.isnan(x) else str(x)
    elif(len(shape)==1):
        return [None if np.isnan(i) else i for i in x]
    elif(len(shape)==2):
        # 对二维向量中的nan进行替换为None
        # 取出每一行
        ans=[]
        for row in x:
            ans.append([None if np.isnan(i) else i for i in row])
        return ans`
  },
  {
    name: 'cov',
    subtitle: '计算协方差',
    info: `
      <li>
      <span class="wave">功能详解</span>：如果 data 是由观测值组成的向量，则 返回结果 为标量值方差。

      如果 data 是其列表示随机变量或行表示观测值的矩阵，则 返回结果 为对应的列方差沿着对角线排列的协方差矩阵。左侧给出了该云函数具体实现代码。
    </li>
    <li><span class="emp">参数 k </span>：如果k=1（默认值），则每行代表一个变量X，另一个行为变量Y。否则，转换关系：每列代表一个变量X，另一个列为变量Y。</li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>
      `,
    url: '/cov',
    json: `{
"k": 1,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
    import json
    import base64
    import numpy as np
    
    
    def handler(event, context):
        s = json.loads(str(base64.b64decode(json.dumps(event['body'])), encoding='utf-8'))
        k = s['k']
        a = np.array(s['data'])
        ans = []
        if (k == 1):
            ans = process(np.cov(a))
        elif (k == 0):
            ans = process(np.cov(a, rowvar=False))
    
        result = {'ans': ans}
        return {
            "statusCode": 200,
            "isBase64Encoded": False,
            "body": json.dumps(result),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    
    def process(x):
        shape=np.shape(x)
        if(len(shape)==0):
            return "None" if np.isnan(x) else str(x)
        elif(len(shape)==1):
            return [None if np.isnan(i) else i for i in x]
        elif(len(shape)==2):
            # 对二维向量中的nan进行替换为None
            # 取出每一行
            ans=[]
            for row in x:
                ans.append([None if np.isnan(i) else i for i in row])
            return ans`
  },
  {
    name: 'mean',
    subtitle: '计算数组或矩阵的均值',
    info: `<li>
      <span class="wave">功能详解</span>：如果 data 是向量，则 mean(A) 返回元素均值。

      如果 data 为矩阵，那么 mean(data) 返回包含每列均值的行向量。左侧给出了该云函数具体实现代码。
    </li>
    <li><span class="emp">参数 k </span>：k = 0：压缩行，对各列求均值，返回1*n的矩阵。k = 1: 压缩列，对各行求均值，返回m*1的矩阵。</li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/mean',
    json: `{
"k": 1,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
    import json
    import base64
    import numpy as np
    
    
    def handler(event, context):
        s = json.loads(str(base64.b64decode(json.dumps(event['body'])), encoding='utf-8'))
        a = np.array(s['data'],dtype=np.float)
        k = s['k']
        ans = process(np.mean(a, axis=k))
        result = {'ans': ans}
    
        return {
            "statusCode": 200,
            "isBase64Encoded": False,
            "body": json.dumps(result),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    
    def process(x):
        shape=np.shape(x)
        if(len(shape)==0):
            return "None" if np.isnan(x) else str(x)
        elif(len(shape)==1):
            return [None if np.isnan(i) else i for i in x]
        elif(len(shape)==2):
            # 对二维向量中的nan进行替换为None
            # 取出每一行
            ans=[]
            for row in x:
                ans.append([None if np.isnan(i) else i for i in row])
            return ans`
  },
  {
    name: 'median',
    subtitle: '计算数组或者矩阵的中位数',
    info: `
      <li>
      <span class="wave">功能详解</span>：如果 data 为向量，则 median(data) 返回 data 的中位数值。

      如果 data 为非空矩阵，则 median(data) 将 A 的各列视为向量，并返回中位数值的行向量。左侧给出了该云函数具体实现代码。
    </li>
    <li><span class="emp">参数 k </span>：计算哪个轴上的中位数，比如输入是二维数组，那么k=0对应行，k=1对应列，如果对于二维数组不指定长度，将拉伸为一唯计算中位数</li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/median',
    json: `{
"k": 0,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np


def handler(event, context):
    s = json.loads(str(base64.b64decode(
        json.dumps(event['body'])), encoding='utf-8'))
    a = np.array(s['data'], dtype=np.float)
    k = s['k']
    ans = process(np.median(a, axis=k))
    result = {'ans': ans}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }


def process(x):
    shape = np.shape(x)
    if(len(shape) == 0):
        return "None" if np.isnan(x) else str(x)
    elif(len(shape) == 1):
        return [None if np.isnan(i) else i for i in x]
    elif(len(shape) == 2):
        # 对二维向量中的nan进行替换为None
        # 取出每一行
        ans = []
        for row in x:
            ans.append([None if np.isnan(i) else i for i in row])
        return ans
`
  },
  {
    name: 'mode',
    subtitle: '统计数组中出现次数最多的值',
    info: `
      <li>
      <span class="wave">功能详解</span>：如果 data 为向量，则 mode(data) 返回 data 中出现次数最多的值。

      如果 data 为非空矩阵，那么 mode(data) 将返回包含 data 每列众数的行向量。左侧给出了该云函数具体实现代码。
    </li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>
      `,
    url: '/mode',
    json: `{
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np


def handler(event, context):
    s = json.loads(str(base64.b64decode(json.dumps(event['body'])), encoding='utf-8'))
    a = np.array(s['data'])
    n = len(a)
    ans = []
    for i in range(0, n):
        me = np.argmax(np.bincount(a[i]))
        ans.append(me)

    ans = np.array(ans)
    result = {'ans': ans.tolist()}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }
`
  }, {
    name: 'normalize',
    subtitle: '归一化数据',
    info: ` <li>
      <span class="wave">功能详解</span>：如果 data 是向量，则 normalize 对整个向量进行运算。

      如果 data 是矩阵、表或时间表，则 normalize 分别对数据的每个列进行运算。左侧给出了该云函数具体实现代码。
    </li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/normalize',
    json: `{
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
    import json
    import numpy as np
    import base64
    
    
    def handler(event, context):
        s = json.loads(str(base64.b64decode(json.dumps(event["body"])), encoding="utf-8"))
        a = np.array(s['data'])
        amin = a.min()
        amax = a.max()
        a = (a - amin) / (amax - amin)
        result = {'ans': a.tolist()}
    
        return {
            "statusCode": 200,
            "isBase64Encoded": False,
            "body": json.dumps(result),
            "headers": {
                "Content-Type": "application/json"
            }
        }`
  }, {
    name: 'std',
    subtitle: '计算标准差',
    info: ` <li>
      <span class="wave">功能详解</span>：如果 data 是观测值的向量，则标准差为标量。

      如果 data 是一个列为随机变量且行为观测值的矩阵，则 std(data) 是一个包含与每列对应的标准差的行向量。左侧给出了该云函数具体实现代码。
    </li>
    <li><span class="emp">参数 k </span>：k= 0表示沿列的标准差，轴= 1表示沿行的标准差</li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/std',
    json: `{
"k": 0,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np


def handler(event, context):
    s = json.loads(str(base64.b64decode(
        json.dumps(event['body'])), encoding='utf-8'))
    a = s['data']
    k = s['k']
    ans = process(np.std(a, axis=k))
    result = {'ans': ans}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }


def process(x):
    shape = np.shape(x)
    if(len(shape) == 0):
        return "None" if np.isnan(x) else str(x)
    elif(len(shape) == 1):
        return [None if np.isnan(i) else i for i in x]
    elif(len(shape) == 2):
        # 对二维向量中的nan进行替换为None
        # 取出每一行
        ans = []
        for row in x:
            ans.append([None if np.isnan(i) else i for i in row])
        return ans
`
  }, {
    name: 'var',
    subtitle: '计算数据的方差',
    info: `<li>
      <span class="wave">功能详解</span>：如果 data 是一个观测值向量，则方差为标量。

      如果 data 是一个其各列为随机变量、其各行为观测值的矩阵，则 返回结果 是一个包含对应于每列的方差的行向量。左侧给出了该云函数具体实现代码。
    </li>
    <li><span class="emp">参数 k </span>：k= 0表示沿列的标准差，轴= 1表示沿行的标准差</li>
    <li>
      <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
    </li>`,
    url: '/var',
    json: `{
"k": 0,
"data": [
    [0,2,3,4,1,2,3,2,3,3,3],
    [0,2,3,4,1,2,3,2,3,3,3],
    [1,2,2,2,2,2,2,2,2,2,2],
    [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
    code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np
def handler (event, context):
    s=json.loads(str(base64.b64decode(json.dumps(event['body'])),encoding='utf-8'))
    a=s['data']
    k=s['k']
    ans=process(np.var(a,axis=k))
    result={'ans': ans}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }

def process(x):
    shape=np.shape(x)
    if(len(shape)==0):
        return "None" if np.isnan(x) else str(x)
    elif(len(shape)==1):
        return [None if np.isnan(i) else i for i in x]
    elif(len(shape)==2):
        # 对二维向量中的nan进行替换为None
        # 取出每一行
        ans=[]
        for row in x:
            ans.append([None if np.isnan(i) else i for i in row])
        return ans`
  }
]
