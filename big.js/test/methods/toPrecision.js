if (typeof test === 'undefined') require('../test');

test('toPrecision', function () {

  function t(expected, value, precision){
    test.areEqual(String(expected), new Big(value).toPrecision(precision));
  }

  Big.DP = 20;
  Big.RM = 1;

  t('0', 0);
  t('0', -0);
  t('0', 0, 1);
  t('0', -0, 1);
  t('0.0', 0, 2);
  t('0.0', -0, 2);

  t('1e+27', '1.2345e+27', 1);
  t('1.2e+27', '1.2345e+27', 2);
  t('1.23e+27', '1.2345e+27', 3);
  t('1.235e+27', '1.2345e+27', 4);
  t('1.2345e+27', '1.2345e+27', 5);
  t('1.23450e+27', '1.2345e+27', 6);
  t('1.234500e+27', '1.2345e+27', 7);

  t('-1e+27', '-1.2345e+27', 1);
  t('-1.2e+27', '-1.2345e+27', 2);
  t('-1.23e+27', '-1.2345e+27', 3);
  t('-1.235e+27', '-1.2345e+27', 4);
  t('-1.2345e+27', '-1.2345e+27', 5);
  t('-1.23450e+27', '-1.2345e+27', 6);
  t('-1.234500e+27', '-1.2345e+27', 7);

  t('7', 7, 1);
  t('7.0', 7, 2);
  t('7.00', 7, 3);

  t('-7', -7, 1);
  t('-7.0', -7, 2);
  t('-7.00', -7, 3);

  t('9e+1', 91, 1);
  t('91', 91, 2);
  t('91.0', 91, 3);
  t('91.00', 91, 4);

  t('-9e+1', -91, 1);
  t('-91', -91, 2);
  t('-91.0', -91, 3);
  t('-91.00', -91, 4);

  t('9e+1', 91.1234, 1);
  t('91', 91.1234, 2);
  t('91.1', 91.1234, 3);
  t('91.12', 91.1234, 4);
  t('91.123', 91.1234, 5);
  t('91.1234', 91.1234, 6);
  t('91.12340', 91.1234, 7);
  t('91.123400', 91.1234, 8);
  t('-9e+1', -91.1234, 1);
  t('-91', -91.1234, 2);
  t('-91.1', -91.1234, 3);
  t('-91.12', -91.1234, 4);
  t('-91.123', -91.1234, 5);
  t('-91.1234', -91.1234, 6);
  t('-91.12340', -91.1234, 7);
  t('-91.123400', -91.1234, 8);

  t('5.55000000000000e-7', 0.000000555, 15);
  t('-5.55000000000000e-7', -0.000000555, 15);
  t('-1.2e-9', -.0000000012345, 2);
  t('-1.2e-8', -.000000012345, 2);
  t('-1.2e-7', -.00000012345, 2);
  t('1e+8', 123456789, 1);
  t('123456789', 123456789, 9);
  t('1.2345679e+8', 123456789, 8);
  t('1.234568e+8', 123456789, 7);
  t('-1.234568e+8', -123456789, 7);

  t('-0.0000012', -.0000012345, 2);
  t('-0.000012', -.000012345, 2);
  t('-0.00012', -.00012345, 2);
  t('-0.0012', -.0012345, 2);
  t('-0.012', -.012345, 2);
  t('-0.12', -.12345, 2);
  t('-1.2', -1.2345, 2);
  t('-12', -12.345, 2);
  t('-1.2e+2', -123.45, 2);
  t('-1.2e+3', -1234.5, 2);
  t('-1.2e+4', -12345, 2);
  t('-1.235e+4', -12345.67, 4);
  t('-1.234e+4', -12344.67, 4);

  t('1.3', 1.25, 2);
  t('1.4', 1.35, 2);

  t('1e+4', 9631.01, 1);
  t('1.0e+7', 9950095.87, 2);
  t('1e+1', '9.856839969', 1);
  t('1e+2', '97.504', 1);
  t('1e+5', 97802.6, 1);
  t('1e+1', 9.9617, 1);
  t('1e+3', 989.2, 1);
  t('1.0e+5', 99576, 2);
  t('1e+8', '96236483.87', 1);

  Big.RM = 0;

  t('-844789036.5239726', '-844789036.52397268892', 16);
  t('-5056.20629012767878749185273209679064306054', '-5056.206290127678787491852732096790643060542', 42);
  t('-0.3287519131314873763501859870298952500', '-0.32875191313148737635018598702989525', 37);
  t('-60729764', '-60729764', 8);
  t('-7.622e-14', '-0.00000000000007622481594531380999826456196664586', 4);
  t('-4686402261639729535.736324492474', '-4686402261639729535.7363244924747488', 31);
  t('-2.0', '-2', 2);
  t('0.0000807327587149839799300000', '0.00008073275871498397993', 24);
  t('-6.000000e-8', '-0.00000006', 7);
  t('-3.83574993e+11', '-383574993535', 9);
  t('7.6987000000000000e-14', '0.000000000000076987', 17);
  t('80928866804.6112050947427973', '80928866804.6112050947427973864826014844575374353', 27);
  t('-0.00730140', '-0.0073014067221009206110062377503733', 6);
  t('2.72104773884160491036088486e+30', '2721047738841604910360884862459.4086993273252009015', 27);
  t('3.008780781917733594e+25', '30087807819177335941398228.1424107931203', 19);
  t('-1.31528920779613669158250146972297797867760000000000000000000e-19', '-0.00000000000000000013152892077961366915825014697229779786776', 60);
  t('-8.5e+11', '-858982311008.257025719798657844609315293821', 2);
  t('-3.6312e-12', '-0.0000000000036312827608449878', 5);
  t('-0.0060000', '-0.006', 5);
  t('-1e+1', '-12', 1);
  t('5.779447e+14', '577944759667712', 7);
  t('-8.753124714248104872487955947563035887800000000000e-13', '-0.00000000000087531247142481048724879559475630358878', 49);
  t('0.000736948830704113912', '0.000736948830704113912970821957479', 18);
  t('-4.65727e+23', '-465727983501322687372765', 6);
  t('-0.00000332331666628036603', '-0.000003323316666280366035430077076052', 18);
  t('3.533702e-8', '0.00000003533702791135712510338001418872124', 7);
  t('-0.04340', '-0.0434', 4);
  t('-597340.278566069086858587852236235470', '-597340.2785660690868585878522362354706741', 36);
  t('6.000e-8', '0.00000006', 4);
  t('-3.624323359112776296e-19', '-0.00000000000000000036243233591127762966338166', 19);
  t('-68249040894032065692.62', '-68249040894032065692.62771690318493', 22);
  t('8786096722661914.89732851', '8786096722661914.89732851188880184891692993684242690315', 24);
  t('-1.8413321536281347264486372900000000000e-12', '-0.00000000000184133215362813472644863729', 38);
  t('4.0e-9', '0.0000000040395827543504045', 2);
  t('-2.9427e+16', '-29427119846374896', 5);
  t('-917760614.4', '-917760614.45404359204911454', 10);
  t('8e+4', '89427', 1);
  t('0.00000920323988134356953828667260', '0.0000092032398813435695382866726', 27);
  t('8.2e+16', '82068995955708118', 2);
  t('3.35195944828e+26', '335195944828445911672446409.3379497158141', 12);
  t('-3.89774891030e-9', '-0.00000000389774891030223957363124620581272897758735065471', 12);
  t('-4', '-4', 1);
  t('8', '8', 1);
  t('1.41172955693912934219137966000000e-10', '0.000000000141172955693912934219137966', 33);
  t('9.21481e+13', '92148111958857', 6);
  t('-5.859975978432853e-18', '-0.0000000000000000058599759784328539', 16);
  t('-72.0', '-72', 3);
  t('3785098751297.8929911950994079707157472', '3785098751297.89299119509940797071574729867819252140059', 38);
  t('4.38e+16', '43893416753778361.297703358127215475077814', 3);
  t('-33110.29096', '-33110.2909623520267070846514', 10);
  t('-74.38305251784882707720486436292121914036495', '-74.3830525178488270772048643629212191403649548392158614', 43);
  t('-4.31091381814e+27', '-4310913818147299779611829988.1707181186375975966133328', 12);
  t('-1e+7', '-19238355', 1);
  t('-8.203834974e+12', '-8203834974826.23347025', 10);
  t('-7.4775e+5', '-747754.16564979702874976822', 5);
  t('-9.291256959320e+23', '-929125695932058727753757.0232350927089256760451379', 13);
  t('8.5e+11', '853985704471', 2);
  t('-6.6560212', '-6.65602121044617863313449309597493831', 8);
  t('1785977942777.20398797', '1785977942777.2039879764361236566223563439', 21);
  t('6.1333504356e+23', '613335043569565749922342.8859983523919141148812213832', 11);
  t('-5.6e+8', '-565718507', 2);
  t('87732918932081', '87732918932081.5225691355449629111825', 14);
  t('34510.55200915393645123', '34510.55200915393645123649', 22);
  t('80406604570281847.64813851700344044652354', '80406604570281847.648138517003440446523542379', 40);
  t('4350.66340515', '4350.66340515436550356256', 12);
  t('-1.795651762606996e+19', '-17956517626069967584.285356976401607845756322546530214497', 16);
  t('9.162e+24', '9162436195089050810891391.493612', 4);
  t('-7.82552e+6', '-7825522.1080200627404337', 6);
  t('-358162040.1796393759838430', '-358162040.17963937598384303781972517649539', 25);
  t('-20732451778.4', '-20732451778.464877395794562570976729066571095229', 12);
  t('-239748.58739', '-239748.5873964402372997371903319', 11);
  t('-6.106537e+9', '-6106537070.58700935776016694', 7);
  t('4e+23', '405561947729011104089456.7617832102516', 1);
  t('-1.7252987e+10', '-17252987633.58674364430598655792', 8);
  t('61.38960691398015334867512513960', '61.3896069139801533486751251396015198659145775291764', 31);
  t('-891.3505', '-891.35058685025619', 7);
  t('1.5e+8', '153705028.906', 2);
  t('5.80e+18', '5805164734299168659.6173113885173384955443', 3);
  t('-1.719875889271327', '-1.719875889271327133154458155573493605566221534', 16);
  t('113.672129563', '113.672129563441659725876055771857758675550104070419635029', 12);
  t('-7.79500528146220810843979e+22', '-77950052814622081084397.91853869253589242574', 24);
  t('4.53106985e+27', '4531069852787151785292512309.2901993579425172826443679877', 9);
  t('45285.246089613169416440797840714', '45285.2460896131694164407978407142422013937', 32);
  t('307760226411464.7333268079863299', '307760226411464.73332680798632996332324381779707', 31);

  Big.RM = 1;

  t('7.905300379788e+16', '79053003797878062.6454954', 13);
  t('-6.83490000000e-13', '-0.00000000000068349', 12);
  t('-62760641815.69084973661201201', '-62760641815.690849736612012010742308663', 28);
  t('0.000704', '0.000704496313', 3);
  t('82926865286287.8852357368342860830310721063079299643', '82926865286287.88523573683428608303107210630792996432', 51);
  t('-0.00032388272393900301214220090249', '-0.00032388272393900301214220090248744799603424908', 29);
  t('8.6e+12', '8621641486938.4837308885005093571508566552428700982454', 2);
  t('2', '2', 1);
  t('1.4641440117052559075e+20', '146414401170525590746.047955203899370771105088', 20);
  t('3511.925583', '3511.925583', 10);
  t('2861824.253079699095728', '2861824.253079699095727765750377038689', 22);
  t('-3.940097756e+10', '-39400977564.548924098664431671700066962', 10);
  t('-888', '-888', 3);
  t('-0.000302106125213724988141721256104', '-0.00030210612521372498814172125610432438685', 30);
  t('6943.4804552555315615809650428503', '6943.480455255531561580965042850266831249032130818358478956', 32);
  t('3365678', '3365678.3397481381125085749', 7);
  t('-5.3943374314e+19', '-53943374313769567458.386865325', 11);
  t('-6.67880509225510150542252852147049489938254298497979', '-6.6788050922551015054225285214704948993825429849797925563674', 51);
  t('1.36424e+18', '1364240644139816224.60228356028', 6);
  t('1.410236477950416725e+23', '141023647795041672538410.84935693266374259666015274447', 19);
  t('-802.817765', '-802.81776500697712984253334522', 9);
  t('-5.276210722424690668896260075355037218851', '-5.27621072242469066889626007535503721885096', 40);
  t('-0.000874209568970788', '-0.0008742095689707877849902027926289294748756775668387', 15);
  t('0.092053833162002', '0.09205383316200189249855864903410820435666385119723209239', 14);
  t('7.0656298318128209e-14', '0.0000000000000706562983181282092835675843980510112', 17);
  t('-8.66511516852116659e+18', '-8665115168521166587', 18);
  t('3.3490648464e+22', '33490648463534229842937.79268276945692333064632966129475', 11);
  t('-39041587174692569176.82740706154183894', '-39041587174692569176.827407061541838942655371389185', 37);
  t('-3834.0', '-3834', 5);
  t('-0.008912382644814418776268630', '-0.00891238264481441877626863', 25);
  t('-2.1e+5', '-206119', 2);
  t('4.83340000000e-8', '0.000000048334', 12);
  t('3.185196533675230520000000000000e-19', '0.000000000000000000318519653367523052', 31);
  t('6.0431217298488095562718496137220939447806000000000000000e-17', '0.000000000000000060431217298488095562718496137220939447806', 56);
  t('196.519569070149034', '196.51956907014903416531531', 18);
  t('0.0000046405006597117307566000', '0.0000046405006597117307566', 23);
  t('9.10e+16', '90974867783311624.1073050261392195984211985571898902', 3);
  t('0.0009', '0.0009', 1);
  t('-784.344', '-784.3442317667756502522526185951859933319162', 6);
  t('4.407336482399797058693e+28', '44073364823997970586929155979.43263841350505', 22);
  t('-3.0000000000e-13', '-0.0000000000003', 11);
  t('0.800', '0.8', 3);
  t('0.04643398170143261158595951942031', '0.046433981701432611585959519420314960367263', 31);
  t('-8e+26', '-786589693451258754942279859.3834', 1);
  t('-26.0', '-26', 3);
  t('-8.462226728e+11', '-846222672789.2087639320702375427266333530942524245', 10);
  t('-4e-7', '-0.0000004019666978288041783154210868', 1);
  t('-315609.775843992', '-315609.775843992', 15);
  t('-3.319e+9', '-3318880945', 4);
  t('-6', '-6.2847', 1);
  t('7.754663772705e+20', '775466377270546647581.033426922028458904663', 13);
  t('-7.2577466365074249372160551716563e+25', '-72577466365074249372160551.71656300408', 32);
  t('-7.8e+14', '-775743793612078', 2);
  t('132441.1194131940273344', '132441.119413194027334448511114274180643744', 22);
  t('-2e+8', '-175718250.88225246544054572629398592939731158738360059', 1);
  t('8603217351572193.39188696', '8603217351572193.391886964766947146712574336', 24);
  t('-9.1544942231978215224e+22', '-91544942231978215224182.9277714', 20);
  t('2.67483212861962e+22', '26748321286196185405759.132664', 15);
  t('-5812371.3', '-5812371.311809024582418495005304074', 8);
  t('-4.56681272e+10', '-45668127184.1622', 9);
  t('-6.833879652430027734e+28', '-68338796524300277341620461049.174596381', 19);
  t('3.5253e+11', '352531868532', 5);
  t('6.18754e+9', '6187538472.1814915517411034136013806202710623466754380762318', 6);
  t('-4.91199142018364313968271511239982195e+28', '-49119914201836431396827151123.99821949990542', 36);
  t('-2.50e+18', '-2498994955335714645.22910610209', 3);
  t('112714.50647532453078481574527706184222476885', '112714.50647532453078481574527706184222476884905812', 44);
  t('1.3e+10', '13358297773', 2);
  t('3.85346866600e+27', '3853468666000315958109987025.078941', 12);
  t('-6.849e+16', '-68490080550892289', 4);
  t('9.095', '9.094726073939375', 4);
  t('4.6722099483e+12', '4672209948311.8638324115985415208264055834', 11);
  t('-75494281.3585391383', '-75494281.3585391382541907932608754414663476859104837422712', 18);
  t('7.9e+2', '787.7709059965548561711769118765', 2);
  t('6103081090513.979878497219802', '6103081090513.9798784972198017843', 28);
  t('-6207456599626114.392919', '-6207456599626114.39291886624528055513014220851925', 22);
  t('844941600554602638837.461606663208684075561936', '844941600554602638837.461606663208684075561935576396', 45);
  t('159438905444627555.28986', '159438905444627555.28985729196359392', 23);
  t('-3688253681705278.414841830526919796661181971979', '-3688253681705278.4148418305269197966611819719792068915', 46);
  t('-63', '-63.164640732796214571844119', 2);
  t('2.8e+11', '276059026705.36069', 2);
  t('357378.987253867425946425403370727230144', '357378.9872538674259464254033707272301441754336', 39);
  t('1597.52674152596523825479', '1597.526741525965238254790848976407269408999607', 24);
  t('4.63310587686706257280646279e+30', '4633105876867062572806462788592.801009', 27);
  t('-6.21108762339449e+20', '-621108762339448671355.1393522133', 15);
  t('8380435.063269894549337249', '8380435.063269894549337248813357930541546715547', 25);

  Big.RM = 2;

  t('0.08000', '0.08', 4);
  t('-4.5132e+21', '-4513243388120382069815.8508153058993058875', 5);
  t('-73549', '-73549.2594630551663822238', 5);
  t('1.275868004728922895890883e+29', '127586800472892289589088296800.6', 25);
  t('-0.0003715444034899460421534099962225699000', '-0.0003715444034899460421534099962225699', 37);
  t('-6.9625565265e+24', '-6962556526511822306135536', 11);
  t('1.67583703641e+13', '16758370364138.915293525076269061228714877', 12);
  t('-173594.95064085553515176707313947534918109631092170', '-173594.950640855535151767073139475349181096310921699', 50);
  t('-6.9503965525e+19', '-69503965525000308384.151383', 11);
  t('4.411225e+20', '441122486054080817112', 7);
  t('2.467044064783596937642371770e+31', '24670440647835969376423717700462.39', 28);
  t('3.9711897549481645654e+24', '3971189754948164565361634.8039734590476326224193520402091769', 20);
  t('-1.4757613208690e+21', '-1475761320868963235919.64499841336073105746686372924161', 14);
  t('91683083887068.6191146', '91683083887068.61911461351134520171343337804061135', 21);
  t('-7923074181102822.578', '-7923074181102822.5778', 19);
  t('-6.800e-8', '-0.000000068', 4);
  t('-2.57954671081460000000e-10', '-0.00000000025795467108146', 21);
  t('5.5352911972e-9', '0.000000005535291197169667611325365189624523452', 11);
  t('6.0488358e+8', '604883577', 8);
  t('3', '3', 1);
  t('-4.072637936805672015603149446630136089530560102165', '-4.0726379368056720156031494466301360895305601021653459970194', 49);
  t('-7.2e+10', '-71689970391', 2);
  t('655754242958.1563938760094919', '655754242958.15639387600949190369', 28);
  t('-7.575535014e-9', '-0.00000000757553501363609536678641245355', 10);
  t('7.547067960578900230644488e-10', '0.00000000075470679605789002306444877998602723', 25);
  t('-3.64561456763e+12', '-3645614567625.4', 12);
  t('9.0e-7', '0.0000009', 2);
  t('7e+2', '687', 1);
  t('517277827334839.8174848543680868', '517277827334839.8174848543680868015165926618', 31);
  t('7e+2', '655.46270361324473194', 1);
  t('1632131488313153.49737424823493573157', '1632131488313153.497374248234935731568', 36);
  t('274068317992.5998880719845028748169734442', '274068317992.5998880719845028748169734442394151076', 40);
  t('-7.060e-9', '-0.00000000706025531009734073', 4);
  t('0.004444', '0.0044439457493', 4);
  t('7.2482770689153111154104782082023e+28', '72482770689153111154104782082.022764082943227214833851', 32);
  t('5.9130694036072794206e+24', '5913069403607279420613864.152', 20);
  t('8.43384561300245347961437966e+23', '843384561300245347961437.96592523791', 27);
  t('0.0000035198821282510000000', '0.000003519882128251', 20);
  t('-1.00371560130267706870097e-9', '-0.00000000100371560130267706870096885251', 24);
  t('17504218.4970302', '17504218.49703016415913667026121376499', 15);
  t('-5e-9', '-0.000000005169058703', 1);
  t('6.922803246e+10', '69228032455', 10);
  t('-16', '-16', 2);
  t('-1.355147513468192707127939151e+40', '-13551475134681927071279391508441439066206.58705380600075', 28);
  t('81670324.1197758695', '81670324.1197758695212865075629796973196504241126', 18);
  t('0.00005', '0.00004797485174640366805332660647', 1);
  t('-4.864397594e-10', '-0.0000000004864397594461335282648538530108953965681345', 10);
  t('47694105.2312532', '47694105.23125322528167211284521303', 15);
  t('-4.962106181e+26', '-496210618135432953927871636.779236', 10);
  t('1.2800030559497062236642e+37', '12800030559497062236641930592334626609.7332', 23);
  t('-574830783.7', '-574830783.6689168903917696583746514637433390929', 10);
  t('5969.431086199057470', '5969.43108619905746956015212970904111744101', 19);
  t('-4.8e+3', '-4814.32904953003285', 2);
  t('4.297e+16', '42973001760252134', 4);
  t('-5.7628e+6', '-5762846.590152347665179652381407653797146356303622218259885', 5);
  t('904864662232032.160612401810317927291657403142932', '904864662232032.16061240181031792729165740314293194205879163', 48);
  t('7.9892e+20', '798923115068265241915.537619430376605', 5);
  t('-8.97759349384000643', '-8.97759349384000643427096282979', 18);
  t('841598023200278219780', '841598023200278219780.04764720909930685', 21);
  t('7.294115e+17', '729411462980818078', 7);
  t('-493854.469231', '-493854.46923056217873', 12);
  t('1.16760483177812e+16', '11676048317781198.761924013', 15);
  t('4.91431629960536e+17', '491431629960536053.49611060493021241774', 15);
  t('-3.913572045646832654662206785248961969115394056441165e+26', '-391357204564683265466220678.524896196911539405644116478', 52);
  t('-1138622.4269179222525707405725062065185867', '-1138622.42691792225257074057250620651858665807616', 41);
  t('7.76249141450727328958717460526e+24', '7762491414507273289587174.60526424654003', 30);
  t('-8.34305e+12', '-8343051798787.85784573983', 6);
  t('-448090139696.5', '-448090139696.540044682', 13);
  t('-249554483941810.04760758280384259798256931579', '-249554483941810.0476075828038425979825693157901967215767', 44);
  t('-4937249656843391.056849', '-4937249656843391.056849458', 22);
  t('-4.90029240789e+24', '-4900292407887576632220011.4', 12);
  t('884134', '884134.30546381722', 6);
  t('-67686.285431006', '-67686.2854310057290328136776917246126204655', 14);
  t('5.1454907927786956678e+21', '5145490792778695667848.5080878826658832100351133', 20);
  t('-3.75540093e+9', '-3755400930.115945946791361377756114557824815082', 9);
  t('790548.1', '790548.055405', 7);
  t('21.9776441681934305611827', '21.9776441681934305611826542081066055', 24);
  t('-8.62915591e+12', '-8629155908036.5010483', 9);
  t('-62521191175', '-62521191175.03721539877599449', 11);
  t('-6.394701017023514561889355048e+22', '-63947010170235145618893.55048264587643', 28);
  t('-4.4791e+5', '-447912.9929543492037', 5);
  t('876897.06887720787797443065', '876897.0688772078779744306464727', 26);
  t('-609834676.749497163216150672711104329822616519', '-609834676.749497163216150672711104329822616518762', 45);
  t('-2.9407315435e+18', '-2940731543474095094.56340709357589521', 11);
  t('243028.94040290384317164750687246', '243028.940402903843171647506872458168411478', 32);
  t('5313610990.737', '5313610990.7373810218', 13);
  t('-3.56e+4', '-35566.4678487', 3);
  t('123.45', '12.345e1', undefined);

  test.isException(function () {new Big(1.23).toPrecision(null)}, "null");
  test.isException(function () {new Big(1.23).toPrecision(NaN)}, "NaN");
  test.isException(function () {new Big(1.23).toPrecision('NaN')}, "'NaN'");
  test.isException(function () {new Big(1.23).toPrecision([])}, "[]");
  test.isException(function () {new Big(1.23).toPrecision({})}, "{}");
  test.isException(function () {new Big(1.23).toPrecision('')}, "''");
  test.isException(function () {new Big(1.23).toPrecision(' ')}, "' '");
  test.isException(function () {new Big(1.23).toPrecision('hello')}, "'hello'");
  test.isException(function () {new Big(1.23).toPrecision('\t')}, "'\t'");
  test.isException(function () {new Big(1.23).toPrecision(new Date)}, "new Date");
  test.isException(function () {new Big(1.23).toPrecision(new RegExp)}, "new RegExp");
  test.isException(function () {new Big(1.23).toPrecision(2.01)}, "2.01");
  test.isException(function () {new Big(1.23).toPrecision(10.5)}, "10.5");
  test.isException(function () {new Big(1.23).toPrecision('1.1e1')}, "'1.1e1'");
  test.isException(function () {new Big(1.23).toPrecision(true)}, "true");
  test.isException(function () {new Big(1.23).toPrecision(false)}, "false");
  test.isException(function () {new Big(1.23).toPrecision(function (){})}, "function (){}");
  test.isException(function () {new Big(1.23).toPrecision(Big('3'))}, "Big('3')");
  test.isException(function () {new Big(1.23).toPrecision('0')}, "'0'");
  test.isException(function () {new Big(1.23).toPrecision('1')}, "'1'");
  test.isException(function () {new Big(1.23).toPrecision('22')}, "'22'");
  test.isException(function () {new Big(1.23).toPrecision('-0.00')}, "'-0.00'");
  test.isException(function () {new Big(1.23).toPrecision('-1')}, "'-1'");
  test.isException(function () {new Big(1.23).toPrecision(-23)}, "-23");
  test.isException(function () {new Big(1.23).toPrecision(1e9 + 1)}, "1e9 + 1");
  test.isException(function () {new Big(1.23).toPrecision(1e9 + 0.1)}, "1e9 + 0.1");
  test.isException(function () {new Big(1.23).toPrecision(0)}, "0");
  test.isException(function () {new Big(1.23).toPrecision('-0')}, "'-0'");
  test.isException(function () {new Big(1.23).toPrecision(0.9)}, "0.9");
  test.isException(function () {new Big(1.23).toPrecision('-1e-1')}, "'-1e-1'");
  test.isException(function () {new Big(1.23).toPrecision(Infinity)}, "Infinity");
  test.isException(function () {new Big(1.23).toPrecision('-Infinity')}, "'-Infinity'");

  // ROUND_UP
  Big.RM = 3;

  t('7.905300379788e+16', '79053003797878062.6454954', 13);
  t('-6.83490000000e-13', '-0.00000000000068349', 12);
  t('-62760641815.69084973661201202', '-62760641815.690849736612012010742308663', 28);
  t('0.000705', '0.000704496313', 3);
  t('82926865286287.8852357368342860830310721063079299644', '82926865286287.88523573683428608303107210630792996432', 51);
  t('-0.00032388272393900301214220090249', '-0.00032388272393900301214220090248744799603424908', 29);
  t('8.7e+12', '8621641486938.4837308885005093571508566552428700982454', 2);
  t('2', '2', 1);
  t('1.4641440117052559075e+20', '146414401170525590746.047955203899370771105088', 20);
  t('3511.925583', '3511.925583', 10);
  t('2861824.253079699095728', '2861824.253079699095727765750377038689', 22);
  t('-3.940097757e+10', '-39400977564.548924098664431671700066962', 10);
  t('-888', '-888', 3);
  t('-0.000302106125213724988141721256105', '-0.00030210612521372498814172125610432438685', 30);
  t('6943.4804552555315615809650428503', '6943.480455255531561580965042850266831249032130818358478956', 32);
  t('3365679', '3365678.3397481381125085749', 7);
  t('-5.3943374314e+19', '-53943374313769567458.386865325', 11);
  t('-6.67880509225510150542252852147049489938254298497980', '-6.6788050922551015054225285214704948993825429849797925563674', 51);
  t('1.36425e+18', '1364240644139816224.60228356028', 6);
  t('1.410236477950416726e+23', '141023647795041672538410.84935693266374259666015274447', 19);
  t('-802.817766', '-802.81776500697712984253334522', 9);
  t('-5.276210722424690668896260075355037218851', '-5.27621072242469066889626007535503721885096', 40);
  t('-0.000874209568970788', '-0.0008742095689707877849902027926289294748756775668387', 15);
  t('0.092053833162002', '0.09205383316200189249855864903410820435666385119723209239', 14);
  t('7.0656298318128210e-14', '0.0000000000000706562983181282092835675843980510112', 17);
  t('-8.66511516852116659e+18', '-8665115168521166587', 18);
  t('3.3490648464e+22', '33490648463534229842937.79268276945692333064632966129475', 11);
  t('-39041587174692569176.82740706154183895', '-39041587174692569176.827407061541838942655371389185', 37);
  t('-3834.0', '-3834', 5);
  t('-0.008912382644814418776268630', '-0.00891238264481441877626863', 25);
  t('-2.1e+5', '-206119', 2);
  t('4.83340000000e-8', '0.000000048334', 12);
  t('3.185196533675230520000000000000e-19', '0.000000000000000000318519653367523052', 31);
  t('6.0431217298488095562718496137220939447806000000000000000e-17', '0.000000000000000060431217298488095562718496137220939447806', 56);
  t('196.519569070149035', '196.51956907014903416531531', 18);
  t('0.0000046405006597117307566000', '0.0000046405006597117307566', 23);
  t('9.10e+16', '90974867783311624.1073050261392195984211985571898902', 3);
  t('0.0009', '0.0009', 1);
  t('-784.345', '-784.3442317667756502522526185951859933319162', 6);
  t('4.407336482399797058693e+28', '44073364823997970586929155979.43263841350505', 22);
  t('-3.0000000000e-13', '-0.0000000000003', 11);
  t('0.800', '0.8', 3);
  t('0.04643398170143261158595951942032', '0.046433981701432611585959519420314960367263', 31);
  t('-8e+26', '-786589693451258754942279859.3834', 1);
  t('-26.0', '-26', 3);
  t('-8.462226728e+11', '-846222672789.2087639320702375427266333530942524245', 10);
  t('-5e-7', '-0.0000004019666978288041783154210868', 1);
  t('-315609.775843992', '-315609.775843992', 15);
  t('-3.319e+9', '-3318880945', 4);
  t('-7', '-6.2847', 1);
  t('7.754663772706e+20', '775466377270546647581.033426922028458904663', 13);
  t('-7.2577466365074249372160551716564e+25', '-72577466365074249372160551.71656300408', 32);
});
