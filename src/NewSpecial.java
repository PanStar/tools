/**
 * Created by PanStar on 2017/7/31.
 */

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class NewSpecial {
    //获取文件及文件夹路径
    private void getListFromFolder(String path, List<String> fileList) {
        File file = new File(path);
        if (file.exists()) {
            fileList.add(path);
            File[] files = file.listFiles();
            if (files.length == 0) {
                return;
            } else {
                for (File f : files) {
                    String p = f.getAbsolutePath();
                    if (f.isDirectory()) {
                        getListFromFolder(p, fileList);
                    }else {
                        fileList.add(p);
                    }
                }
            }
        } else {
            System.out.println("文件不存在!");
        }
    }
    //修改文件内容并创建 批量
    private void modifyFile(List<String> fileList, String[] oldStr, String[] newStr){
        for(String file : fileList){
            modifyFile(file, oldStr, newStr);
        }
    }
    //修改文件内容并创建 单文件
    private void modifyFile(String filePath, String[] oldStr, String[] newStr){
        String newPath = filePath;
        for(int i = 0, len = oldStr.length; i < len; i++){
            newPath = newPath.replaceAll(oldStr[i], newStr[i]);
        }
        File file = new File(filePath);
        File newFile = new File(newPath);

        if(file.isDirectory()){
            if(!newFile.exists()) newFile.mkdirs();
        }else{
            String encoding="UTF-8";
            StringBuffer buf = new StringBuffer();
            try{
                if(file.isFile() && file.exists()){ //判断文件是否存在
                    InputStreamReader read = new InputStreamReader(new FileInputStream(file),encoding);//考虑到编码格式
                    BufferedReader bufferedReader = new BufferedReader(read);
                    String lineTxt = null;
                    while((lineTxt = bufferedReader.readLine()) != null){
                        buf.append(lineTxt).append(System.getProperty("line.separator"));//回写的时候加上本操作系统的换行符
                    }
                    read.close();

                    BufferedWriter bw = new BufferedWriter(new FileWriter(newPath));
                    String newTxt = buf.toString();
                    for(int i = 0, len = oldStr.length; i < len; i++){
                        newTxt = newTxt.replaceAll(oldStr[i], newStr[i]);
                    }
                    bw.write(newTxt);
                    bw.close();
                }else{
                    System.out.println("找不到指定的文件");
                }
            } catch (Exception e) {
                System.out.println("读取文件内容出错");
                e.printStackTrace();
            } finally{

            }
        }
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        System.out.println("Start...");

        String path = "D:\\test\\新建公共专题模版_template";
        String[] oldStr = new String[]{"template","TEMPLATE","TemplateAnalysis","公共专题"};
        //String[] newStr = new String[]{"raa","RAA","42ResidenceAreaAnalysis","居民区场景分析专题"};
        String[] newStr = new String[]{"tfa","TFA","46TrafficFraudAnalysis","流量欺诈分析专题"};

        List<String> fileList = new ArrayList<String>();
        NewSpecial cs = new NewSpecial();
        cs.getListFromFolder(path, fileList);
        cs.modifyFile(fileList, oldStr, newStr);

        System.out.println("====End====");
    }
}
