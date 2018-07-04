import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class ImageCheck {
    public static boolean imageCheck(File file) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(file);
        if (fileInputStream == null) {
            return false;
        }
        Image image;
        try {
            image = ImageIO.read(fileInputStream);
            return (!(image == null || image.getWidth(null) <= 0 || image.getHeight(null) <= 0));
        }
        catch (IOException e){
            return false;
        }
    }
}
