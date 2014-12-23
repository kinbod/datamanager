/***********************************************************
	*将文件或是文件夹打包压缩成zip格式
	*
	*@see(与该类相关联的类)
	*
*广联达
*
*版权：本文件版权归属北京广联达软件股份有限公司
*
*
	*@author:郭冲
	*
	*@since:jdk1.5
	*
*
	*@version:1.0
	*
*@date:2014年4月29日
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;


public class ZipUtils {

   /**
     * 创建ZIP文件
     * @param sourcePath 文件或文件夹路径
     * @param zipPath 生成的zip文件存在路径（包括文件名）
     */
    public static void createZip(String sourcePath, String zipPath) {
        FileOutputStream fos = null;
        ZipOutputStream zos = null;
        try {
            fos = new FileOutputStream(zipPath);
            zos = new ZipOutputStream(fos);
            zos.setEncoding("utf-8");
            writeZip(new File(sourcePath), "", zos);
        } catch (FileNotFoundException e) {
            System.out.println("创建ZIP文件失败:"+e);
        } finally {
            try {
                if (zos != null) {
                    zos.close();
                }
            } catch (IOException e) {
            	System.out.println("创建ZIP文件失败:"+e);
            }

        }
    }

    private static void writeZip(File file, String parentPath, ZipOutputStream zos) {
        if(file.exists()){
            if(file.isDirectory()){//处理文件夹
                parentPath+=file.getName()+File.separator;
                File [] files=file.listFiles();
                for(File f:files){
                    writeZip(f, parentPath, zos);
                }
            }else{
                FileInputStream fis=null;
                try {
                    fis=new FileInputStream(file);
                    ZipEntry ze = new ZipEntry(parentPath + file.getName());
                    ze.setUnixMode(644);//解决linux下乱码
                    zos.putNextEntry(ze);
                    byte [] content=new byte[2048];
                    int len;
                    while((len=fis.read(content))!=-1){
                    	zos.setEncoding("utf-8");
                        zos.write(content,0,len);
                        zos.flush();
                    }

                } catch (FileNotFoundException e) {
                	System.out.println("创建ZIP文件失败:"+e);
                } catch (IOException e) {
                	System.out.println("创建ZIP文件失败:"+e);
                }finally{
                    try {
                        if(fis!=null){
                            fis.close();
                        }
                    }catch(IOException e){
                    	System.out.println("创建ZIP文件失败:"+e);
                    }
                }
            }
        }
    } 
    
    
    public String copyFile4Linux(String srcFilePath,String dirPath){
    	
    	return null;
    }

}