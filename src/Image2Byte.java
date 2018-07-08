import java.io.*;
import java.util.ArrayList;
import java.util.List;


public class Image2Byte {
    //整个文件夹中所有图片的读取
    public static List image2ByteFolder(File file) throws IOException {
        List list = new ArrayList();//存储文件夹中的图片转化成的字符

        if(!file.isDirectory()&&ImageCheck.imageCheck(file)){//单个图片
            FileInputStream fileInputStream=new FileInputStream(file);
            byte[] z=new byte[(int)file.length()];
            fileInputStream.read(z);
            list.add(z);
            fileInputStream.close();
            return list;
        }else {//文件夹
            File[] files = file.listFiles();
            for (File file2 : files) {
                /*如果在files中发现了文件夹，继续遍历此文件夹中的内容
                 * 递归*/
                if (file2.isDirectory()) {
                    image2ByteFolder(file2);
                }
                //判断所选的文件是否为图片
                else if (ImageCheck.imageCheck(file2)) {
                    FileInputStream fileInputStream = new FileInputStream(file2);
                    byte[] z = new byte[(int) file2.length()];
                    fileInputStream.read(z);
                    list.add(z);//加入到list中
                    fileInputStream.close();
                }
            }
            return list;
        }
    }
}
