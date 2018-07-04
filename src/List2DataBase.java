import java.util.List;

//add to database
public class List2DataBase {
    public static byte[] list2DataBase(List list) {

        byte [] a=null;
        for(int i=0;i<list.size();i++){
            a= (byte[])list.get(i);

            /*
             add to database
             */
            for(int j=0;j<1;j++){
                System.out.print(a[j] + " ");
            }
        }
        return a;
    }
}
