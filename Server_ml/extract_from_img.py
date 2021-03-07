import cv2
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from skimage.feature import local_binary_pattern

# 输入图片得到特征： 输入大小要求（前后景分离比较明显）+ 输出 6个特征
def extract_feature(input_img_path):

    #载入原图
    img_original=cv2.imread(input_img_path)
    #设定颜色阈值
    img_hsv=cv2.cvtColor(img_original,cv2.COLOR_BGR2HSV)
    img_yellow=cv2.inRange(img_original,(0,0,0),(200,255,255))
    ##输入图像与输入图像在掩模条件下按位与，得到掩模范围内的原图像
    img_specifiedColor0=cv2.bitwise_and(img_original,img_original,mask=img_yellow)
    #cv2.imwrite('E:/Python_code/1.jpg',img_specifiedColor,[int(cv2.IMWRITE_JPEG_QUALITY),70])

    img_specifiedColor = cv2.cvtColor(img_specifiedColor0, cv2.COLOR_RGB2GRAY)
    contours0, hierarch0 = cv2.findContours(img_specifiedColor, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # 填充噪点
    threshold = 500
    for i in range(len(contours0)):
        area = cv2.contourArea(contours0[i])
        if area < threshold:  # 若面积大于设定阈值，进行填充
            data_tn1 = cv2.drawContours(img_specifiedColor, [contours0[i]], 0, 0, thickness=-1)

    # 获取苹果轮廓信息
    contours1, hierarch1 = cv2.findContours(data_tn1, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # 外接矩形（见图3），提取长、宽比
    x, y, w, h = cv2.boundingRect(contours1[0])
    cv2.rectangle(data_tn1, (x,y), (x+w,y+h), (100,100,0), 6)
    ratio=min(w,h)/max(w,h)
    #ratio	plumpness	texture  	r	b	g

    # 获取轮廓面积及饱满度
    area = cv2.contourArea(contours1[0])
    plumpness=area/(w*h)

    # 获取纹理信息
    radius = 3
    n_points = 8 * radius
    lbp = local_binary_pattern(data_tn1, n_points, radius)
    texture0 = []
    for i in range(0,len(lbp)):
        for j in range(0,len(lbp[i])):
            texture0.append(lbp[i][j])
    texture1=np.array(texture0)
    scaler = MinMaxScaler()
    texture1= scaler.fit_transform(texture1.reshape(-1, 1))
    texture = np.mean(texture1)

    #获取颜色信息
    b, g, r = cv2.split(img_specifiedColor0)
    b = b[b != 0]
    g = g[g != 0]
    r = r[r != 0]
    b= scaler.fit_transform(b.reshape(-1, 1))
    b = np.mean(b)
    g= scaler.fit_transform(g.reshape(-1, 1))
    g = np.mean(g)
    r= scaler.fit_transform(r.reshape(-1, 1))
    r = np.mean(r)

    output=[[ratio,plumpness,texture,r,g,b]]

    return output

def main():
    output = extract_feature()
    print(output)

if __name__ == "__main__":
    main()
